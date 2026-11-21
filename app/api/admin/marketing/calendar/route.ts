import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
const allowedStatuses = ["planned","draft","in_review","approved","scheduled","published","cancelled"];
async function ensureCalendar(){
 await db.execute(`CREATE TABLE IF NOT EXISTS marketing_calendar (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  campaign_id BIGINT UNSIGNED NULL,
  title VARCHAR(255) NOT NULL,
  topic VARCHAR(1000) NOT NULL,
  channel VARCHAR(64) NOT NULL DEFAULT 'social',
  content_type VARCHAR(64) NOT NULL DEFAULT 'post',
  scheduled_for DATETIME NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'planned',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_marketing_calendar_user_date (user_id, scheduled_for),
  INDEX idx_marketing_calendar_campaign (campaign_id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
}
function originOk(req:Request){const origin=req.headers.get("origin");if(!origin)return true;try{return new URL(origin).host===req.headers.get("host")}catch{return false}}
export async function GET(){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});try{await ensureCalendar();const [rows]=await db.execute("SELECT id,campaign_id AS campaignId,title,topic,channel,content_type AS contentType,scheduled_for AS scheduledFor,status,notes,created_at AS createdAt FROM marketing_calendar WHERE user_id=? ORDER BY scheduled_for IS NULL,scheduled_for ASC LIMIT 500",[user.id]);return NextResponse.json({items:rows})}catch(e){console.error("Calendar list error",e);return NextResponse.json({error:"Calendar database unavailable."},{status:503})}}
export async function POST(req:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});if(!originOk(req))return NextResponse.json({error:"Origin rejected."},{status:403});let b:Record<string,unknown>;try{b=await req.json()}catch{return NextResponse.json({error:"Invalid JSON."},{status:400})}
const title=typeof b.title==="string"?b.title.trim().slice(0,255):"",topic=typeof b.topic==="string"?b.topic.trim().slice(0,1000):title,channel=typeof b.channel==="string"?b.channel.slice(0,64):"social",type=typeof b.contentType==="string"?b.contentType.slice(0,64):"post",status=typeof b.status==="string"&&allowedStatuses.includes(b.status)?b.status:"planned",notes=typeof b.notes==="string"?b.notes.slice(0,4000):"",date=typeof b.scheduledFor==="string"&&b.scheduledFor.trim()?b.scheduledFor.trim():null;
if(!title||!topic)return NextResponse.json({error:"Title and topic are required."},{status:400});
try{await ensureCalendar();const [r]=await db.execute("INSERT INTO marketing_calendar (user_id,campaign_id,title,topic,channel,content_type,scheduled_for,status,notes) VALUES (?,?,?,?,?,?,?,?,?)",[user.id,typeof b.campaignId==="number"?b.campaignId:null,title,topic,channel,type,date,status,notes]);return NextResponse.json({created:true,id:(r as {insertId?:number}).insertId})}catch(e){console.error("Calendar create error",e);return NextResponse.json({error:"Could not save calendar item."},{status:503})}}
export async function PATCH(req:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});if(!originOk(req))return NextResponse.json({error:"Origin rejected."},{status:403});let b:Record<string,unknown>;try{b=await req.json()}catch{return NextResponse.json({error:"Invalid JSON."},{status:400})}const id=Number(b.id),status=typeof b.status==="string"?b.status:"";if(!Number.isSafeInteger(id)||id<1||!allowedStatuses.includes(status))return NextResponse.json({error:"Valid item ID and status are required."},{status:400});try{await ensureCalendar();const [r]=await db.execute("UPDATE marketing_calendar SET status=? WHERE id=? AND user_id=?",[status,id,user.id]);return NextResponse.json({updated:(r as {affectedRows?:number}).affectedRows===1})}catch(e){console.error("Calendar update error",e);return NextResponse.json({error:"Could not update calendar item."},{status:503})}}
