import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
const DISCLOSURE = "Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.";
const DISTRIBUTOR = "AMFI-Registered Mutual Fund Distributor · ARN 365140";
const MODEL = process.env.OPENAI_MARKETING_MODEL || "gpt-4.1-mini";

type Campaign = { title:string; objective:string; english:string; hindi:string; videoPrompt:string; voiceover:string; hashtags:string[]; complianceNotes:string[] };

async function ensureTable(){
  await db.execute(`CREATE TABLE IF NOT EXISTS marketing_campaigns (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_by BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    objective TEXT NULL,
    english_content LONGTEXT NOT NULL,
    hindi_content LONGTEXT NOT NULL,
    video_prompt LONGTEXT NULL,
    voiceover LONGTEXT NULL,
    hashtags TEXT NULL,
    compliance_notes TEXT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_marketing_campaign_user_created (created_by, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
}
function normalize(input:unknown):Campaign{
  if(!input||typeof input!=="object")throw new Error("Invalid campaign payload");
  const v=input as Record<string,unknown>, str=(x:unknown)=>typeof x==="string"?x.trim():"";
  return {title:str(v.title).slice(0,255),objective:str(v.objective),english:str(v.english),hindi:str(v.hindi),videoPrompt:str(v.videoPrompt),voiceover:str(v.voiceover),hashtags:Array.isArray(v.hashtags)?v.hashtags.filter((x):x is string=>typeof x==="string").slice(0,20):[],complianceNotes:Array.isArray(v.complianceNotes)?v.complianceNotes.filter((x):x is string=>typeof x==="string").slice(0,12):[]};
}
function screen(c:Campaign){
  const banned=["financial advisor","financial adviser","financial planner","wealth manager","investment consultant","portfolio management","personalized investment advice","guaranteed return","assured return","fixed return","risk-free return","highest return","multibagger","best fund","top fund","portfolio review"];
  const all=[c.title,c.objective,c.english,c.hindi,c.videoPrompt,c.voiceover].join(" ").toLowerCase();
  const terms=banned.filter(x=>all.includes(x));
  const missingDisclosure=!c.english.includes(DISCLOSURE)||!c.hindi.includes(DISCLOSURE);
  return {passed:terms.length===0&&!missingDisclosure,detectedTerms:terms,disclosureMissing:missingDisclosure,distributorDisclosure:DISTRIBUTOR,riskDisclosure:DISCLOSURE,humanReviewRequired:true};
}
function sameOrigin(request:Request){
  const origin=request.headers.get("origin");
  if(!origin)return true;
  try{return new URL(origin).host===request.headers.get("host")}catch{return false}
}
export async function GET(){
  const user=await getCurrentUser();
  if(!user)return NextResponse.json({error:"Authentication required."},{status:401});
  try{await ensureTable();const [rows]=await db.execute(`SELECT id,title,topic,objective,english_content AS english,hindi_content AS hindi,video_prompt AS videoPrompt,voiceover,hashtags,compliance_notes AS complianceNotes,status,created_at AS createdAt FROM marketing_campaigns WHERE created_by=? ORDER BY created_at DESC LIMIT 100`,[user.id]);return NextResponse.json({campaigns:rows})}
  catch(error){console.error("Marketing campaign list error:",error);return NextResponse.json({error:"Campaign database is unavailable. Verify database configuration and connectivity."},{status:503})}
}
export async function POST(request:Request){
  const user=await getCurrentUser();
  if(!user)return NextResponse.json({error:"Authentication required."},{status:401});
  if(!sameOrigin(request))return NextResponse.json({error:"Request origin rejected."},{status:403});
  let body:Record<string,unknown>;
  try{body=await request.json()}catch{return NextResponse.json({error:"Invalid JSON request."},{status:400})}
  if(body.action==="generate"){
    const topic=typeof body.topic==="string"?body.topic.trim().slice(0,1000):"";
    if(!topic)return NextResponse.json({error:"Campaign topic is required."},{status:400});
    const key=process.env.OPENAI_API_KEY;
    if(!key)return NextResponse.json({error:"AI is not configured. Set OPENAI_API_KEY in the server environment."},{status:503});
    const system=`Create educational marketing for Luxmi InvestCare, an Indian AMFI-registered mutual fund distributor (ARN 365140). No personalized recommendations, fund/scheme selection, performance/ranking claims, promises, guarantees, or advisory/planning-service language. Avoid these expressions: financial advisor/adviser, financial planner, wealth manager, investment consultant, portfolio management, personalized investment advice, portfolio review, best/top fund, highest return, guaranteed/assured/fixed/risk-free return, multibagger, retirement planning as a service, wealth creation services, goal-based or goal-oriented service. English and Hindi must align in facts and message. Both post fields must include this exact disclosure: ${DISCLOSURE} and this distributor identification: ${DISTRIBUTOR}. Add CTA Call 9650060044. Return JSON only with title, objective, english, hindi, videoPrompt, voiceover, hashtags (array), complianceNotes (array).`;
    const userPrompt=`Create a concise bilingual educational campaign about: ${topic}. English and Hindi must communicate the same facts, CTA and disclosure. Do not invent returns, statistics, dates or regulatory claims.`;
    try{
      const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${key}`},body:JSON.stringify({model:MODEL,temperature:0.35,response_format:{type:"json_object"},messages:[{role:"system",content:system},{role:"user",content:userPrompt}]}),signal:AbortSignal.timeout(45000)});
      if(!response.ok){console.error("AI provider response status",response.status);return NextResponse.json({error:"AI provider failed to generate the campaign. Please try again."},{status:502})}
      const data=await response.json(),raw=data?.choices?.[0]?.message?.content;
      if(typeof raw!=="string")return NextResponse.json({error:"AI returned no campaign content."},{status:502});
      const campaign=normalize(JSON.parse(raw));
      if(!campaign.title||!campaign.english||!campaign.hindi)return NextResponse.json({error:"AI response was incomplete. Regenerate."},{status:502});
      return NextResponse.json({campaign,compliance:screen(campaign),model:MODEL});
    }catch(error){console.error("Campaign generation error:",error);return NextResponse.json({error:"Generation failed or timed out. Please retry."},{status:502})}
  }
  if(body.action==="save"){
    const campaign=normalize(body.campaign),topic=typeof body.topic==="string"?body.topic.trim().slice(0,1000):campaign.title;
    if(!campaign.title||!campaign.english||!campaign.hindi)return NextResponse.json({error:"Campaign content is incomplete."},{status:400});
    const result=screen(campaign),status=result.passed?"draft":"needs_review";
    try{await ensureTable();const [insert]=await db.execute(`INSERT INTO marketing_campaigns (created_by,title,topic,objective,english_content,hindi_content,video_prompt,voiceover,hashtags,compliance_notes,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[user.id,campaign.title,topic,campaign.objective,campaign.english,campaign.hindi,campaign.videoPrompt,campaign.voiceover,JSON.stringify(campaign.hashtags),JSON.stringify({...result,notes:campaign.complianceNotes}),status]);return NextResponse.json({saved:true,id:(insert as {insertId?:number}).insertId,status,compliance:result})}
    catch(error){console.error("Campaign save error:",error);return NextResponse.json({error:"Could not persist campaign. Verify database configuration."},{status:503})}
  }
  return NextResponse.json({error:"Unsupported action."},{status:400});
}
