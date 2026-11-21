import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

const DISCLOSURE = "Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.";
const DISTRIBUTOR = "AMFI-Registered Mutual Fund Distributor · ARN 365140";
const MODEL = process.env.OPENAI_MARKETING_MODEL || "gpt-4.1-mini";

type GeneratedCampaign = {
  title: string;
  objective: string;
  english: string;
  hindi: string;
  videoPrompt: string;
  voiceover: string;
  hashtags: string[];
  complianceNotes: string[];
};

async function ensureCampaignTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS marketing_campaigns (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

function cleanCampaign(input: unknown): GeneratedCampaign {
  if (!input || typeof input !== "object") throw new Error("AI returned an invalid campaign.");
  const value = input as Record<string, unknown>;
  const str = (v: unknown) => typeof v === "string" ? v.trim() : "";
  return {
    title: str(value.title).slice(0, 255),
    objective: str(value.objective),
    english: str(value.english),
    hindi: str(value.hindi),
    videoPrompt: str(value.videoPrompt),
    voiceover: str(value.voiceover),
    hashtags: Array.isArray(value.hashtags) ? value.hashtags.filter((x): x is string => typeof x === "string").slice(0, 20) : [],
    complianceNotes: Array.isArray(value.complianceNotes) ? value.complianceNotes.filter((x): x is string => typeof x === "string").slice(0, 12) : [],
  };
}

function screenCampaign(campaign: GeneratedCampaign) {
  const forbidden = [
    "financial advisor", "financial adviser", "financial planner", "wealth manager",
    "investment consultant", "portfolio management", "personalized investment advice",
    "guaranteed return", "assured return", "fixed return", "risk-free return",
    "highest return", "multibagger", "best fund", "top fund", "portfolio review",
  ];
  const content = [campaign.title, campaign.objective, campaign.english, campaign.hindi, campaign.videoPrompt, campaign.voiceover].join(" ").toLowerCase();
  const detected = forbidden.filter(term => content.includes(term));
  const requiredDisclosureMissing = !campaign.english.includes(DISCLOSURE) || !campaign.hindi.includes(DISCLOSURE);
  return {
    passed: detected.length === 0 && !requiredDisclosureMissing,
    detectedTerms: detected,
    disclosureMissing: requiredDisclosureMissing,
    distributorDisclosure: DISTRIBUTOR,
    riskDisclosure: DISCLOSURE,
    humanReviewRequired: true,
  };
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    await ensureCampaignTable();
    const [rows] = await db.execute(
      `SELECT id, title, topic, objective, english_content AS english, hindi_content AS hindi,
        video_prompt AS videoPrompt, voiceover, hashtags, compliance_notes AS complianceNotes,
        status, created_at AS createdAt
       FROM marketing_campaigns WHERE created_by = ? ORDER BY created_at DESC LIMIT 100`,
      [user.id],
    );
    return NextResponse.json({ campaigns: rows });
  } catch (error) {
    console.error("Marketing campaign list failed:", error);
    return NextResponse.json({ error: "Campaign storage is not available. Check database configuration." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }

  const action = body.action;
  if (action === "generate") {
    const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, 1000) : "";
    if (!topic) return NextResponse.json({ error: "Campaign topic is required." }, { status: 400 });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "AI generation is not configured. Add OPENAI_API_KEY to server environment." }, { status: 503 });

    const system = `You create educational marketing content for Luxmi InvestCare, an Indian AMFI-registered mutual fund distributor (ARN 365140). Strict compliance rules: do not use terms that imply financial advisory or planning services, including financial advisor/adviser, financial planner, wealth manager, investment consultant, portfolio management, personalized investment advice, portfolio review, best/top fund, highest return, guaranteed/assured/fixed/risk-free return, multibagger, retirement planning as a service, wealth creation services, goal-based or goal-oriented service. Never promise returns, rank funds, suggest specific securities/schemes, or make performance claims. Use educational, neutral, accessible language. English and Hindi must communicate the same facts and message. Include the exact risk disclosure in BOTH languages as specified below (retain the English disclosure exactly in both fields to ensure legal wording is unchanged): ${DISCLOSURE}. Include distributor identification ${DISTRIBUTOR}. Provide concise social content, an avatar video prompt, voiceover, hashtags, and compliance notes. Return only JSON matching keys title, objective, english, hindi, videoPrompt, voiceover, hashtags (array), complianceNotes (array). The English and Hindi posts must each include the exact risk disclosure and distributor identification.`;
    const userPrompt = `Create a concise educational campaign about: ${topic}. Include CTA "Call 9650060044". Keep it educational and not advisory. English and Hindi posts must align in facts, structure and CTA. Include the required disclosure verbatim.`;
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.4,
          response_format: { type: "json_object" },
          messages: [{ role: "system", content: system }, { role: "user", content: userPrompt }],
        }),
        signal: AbortSignal.timeout(45000),
      });
      if (!response.ok) {
        const details = await response.text();
        console.error("Marketing AI provider error:", response.status, details.slice(0, 500));
        return NextResponse.json({ error: "AI generation provider returned an error. Please try again." }, { status: 502 });
      }
      const payload = await response.json();
      const raw = payload?.choices?.[0]?.message?.content;
      if (typeof raw !== "string") return NextResponse.json({ error: "AI returned no campaign content." }, { status: 502 });
      const campaign = cleanCampaign(JSON.parse(raw));
      if (!campaign.title || !campaign.english || !campaign.hindi) return NextResponse.json({ error: "AI response is incomplete. Please regenerate." }, { status: 502 });
      const compliance = screenCampaign(campaign);
      return NextResponse.json({ campaign, compliance, model: MODEL });
    } catch (error) {
      console.error("Marketing campaign generation failed:", error);
      return NextResponse.json({ error: "Campaign generation failed. Please retry." }, { status: 502 });
    }
  }

  if (action === "save") {
    const campaign = cleanCampaign(body.campaign);
    const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, 1000) : campaign.title;
    if (!campaign.title || !campaign.english || !campaign.hindi) return NextResponse.json({ error: "Campaign is incomplete." }, { status: 400 });
    const compliance = screenCampaign(campaign);
    const status = compliance.passed ? "draft" : "needs_review";
    try {
      await ensureCampaignTable();
      const [result] = await db.execute(
        `INSERT INTO marketing_campaigns
          (created_by, title, topic, objective, english_content, hindi_content, video_prompt, voiceover, hashtags, compliance_notes, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user.id, campaign.title, topic, campaign.objective, campaign.english, campaign.hindi, campaign.videoPrompt, campaign.voiceover, JSON.stringify(campaign.hashtags), JSON.stringify({ ...compliance, notes: campaign.complianceNotes }), status],
      );
      return NextResponse.json({ saved: true, id: (result as { insertId?: number }).insertId, status, compliance });
    } catch (error) {
      console.error("Marketing campaign save failed:", error);
      return NextResponse.json({ error: "Campaign could not be saved. Check database configuration." }, { status: 503 });
    }
  }

  return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
}
