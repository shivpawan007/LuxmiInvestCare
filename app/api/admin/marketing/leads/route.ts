import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
export const runtime="nodejs";
const leadStatuses=["new","contacted","follow_up","converted","closed","opted_out"];
async function ensureLeads(){await db.execute(`CREATE TABLE IF NOT EXISTS marketing_leads (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 owner_user_id BIGINT NOT NULL,
 full_name VARCHAR(160) NOT NULL,
 phone VARCHAR(32) NULL,
 email VARCHAR(254) NULL,
 source VARCHAR(120) NULL,
 interest VARCHAR(255) NULL,
 consent_status VARCHAR(32) NOT NULL DEFAULT 'unknown',
 consent_note VARCHAR(1000) NULL,
 status VARCHAR(32) NOT NULL DEFAULT 'new',
 next_follow_up DATETIME NULL,
 notes TEXT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 INDEX idx_marketing_leads_owner_status (owner_user_id,status),
 INDEX idx_marketing_leads_followup (owner_user_id,next_follow_up)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)}
function originOk(req:Request){const origin=req.headers.get("origin");if(!origin)return true;try{return new URL(origin).host===req.headers.get("host")}catch{return false}}
export async function GET(){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});try{await ensureLeads();const [rows]=await db.execute("SELECT id,full_name AS fullName,phone,email,source,interest,consent_status AS consentStatus,consent_note AS consentNote,status,next_follow_up AS nextFollowUp,notes,created_at AS createdAt FROM marketing_leads WHERE owner_user_id=? ORDER BY created_at DESC LIMIT 500",[user.id]);return NextResponse.json({leads:rows})}catch(e){console.error("Leads read error",e);return NextResponse.json({error:"Lead database unavailable."},{status:503})}}
export async function POST(req:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});if(!originOk(req))return NextResponse.json({error:"Origin rejected."},{status:403});let b:Record<string,unknown>;try{b=await req.json()}catch{return NextResponse.json({error:"Invalid JSON."},{status:400})}
const name=typeof b.fullName==="string"?b.fullName.trim().slice(0,160):"",phone=typeof b.phone==="string"?b.phone.trim().slice(0,32):null,email=typeof b.email==="string"?b.email.trim().slice(0,254):null,source=typeof b.source==="string"?b.source.trim().slice(0,120):null,interest=typeof b.interest==="string"?b.interest.trim().slice(0,255):null,consent=typeof b.consentStatus==="string"?b.consentStatus:"unknown",consentNote=typeof b.consentNote==="string"?b.consentNote.trim().slice(0,1000):null,status=typeof b.status==="string"&&leadStatuses.includes(b.status)?b.status:"new",follow=typeof b.nextFollowUp==="string"&&b.nextFollowUp.trim()?b.nextFollowUp.trim():null,notes=typeof b.notes==="string"?b.notes.slice(0,4000):null;
if(!name||(!phone&&!email))return NextResponse.json({error:"Name and at least one contact field (phone or email) are required."},{status:400});
if(!["unknown","consented","declined","withdrawn"].includes(consent))return NextResponse.json({error:"Invalid consent status."},{status:400});
if(["declined","withdrawn"].includes(consent)&&status!=="opted_out")return NextResponse.json({error:"Declined or withdrawn consent requires opted_out status."},{status:400});
try{await ensureLeads();const [r]=await db.execute("INSERT INTO marketing_leads (owner_user_id,full_name,phone,email,source,interest,consent_status,consent_note,status,next_follow_up,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[user.id,name,phone,email,source,interest,consent,consentNote,status,follow,notes]);return NextResponse.json({created:true,id:(r as {insertId?:number}).insertId})}catch(e){console.error("Lead create error",e);return NextResponse.json({error:"Could not save lead."},{status:503})}}
export async function PATCH(req:Request){const user=await getCurrentUser();if(!user)return NextResponse.json({error:"Authentication required."},{status:401});if(!originOk(req))return NextResponse.json({error:"Origin rejected."},{status:403});let b:Record<string,unknown>;try{b=await req.json()}catch{return NextResponse.json({error:"Invalid JSON."},{status:400})}const id=Number(b.id),status=typeof b.status==="string"?b.status:"",consent=typeof b.consentStatus==="string"?b.consentStatus:null;if(!Number.isSafeInteger(id)||id<1)return NextResponse.json({error:"Valid lead ID required."},{status:400});if(status&&!leadStatuses.includes(status))return NextResponse.json({error:"Invalid status."},{status:400});if(consent&&!["unknown","consented","declined","withdrawn"].includes(consent))return NextResponse.json({error:"Invalid consent status."},{status:400});const finalStatus=status||"",finalConsent=consent||"";if(["declined","withdrawn"].includes(finalConsent)&&finalStatus&&finalStatus!=="opted_out")return NextResponse.json({error:"Withdrawn/declined consent cannot remain contactable."},{status:400});try{await ensureLeads();const [r]=await db.execute("UPDATE marketing_leads SET status=COALESCE(NULLIF(?,''),status),consent_status=COALESCE(NULLIF(?,''),consent_status),next_follow_up=COALESCE(?,next_follow_up),notes=COALESCE(?,notes) WHERE id=? AND owner_user_id=?",[status,consent,b.nextFollowUp??null,b.notes??null,id,user.id]);return NextResponse.json({updated:(r as {affectedRows?:number}).affectedRows===1})}catch(e){console.error("Lead update error",e);return NextResponse.json({error:"Could not update lead."},{status:503})}}
