"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight, CalendarDays, CheckCircle2, Clock3, FileText, Lightbulb,
  Megaphone, MessageSquare, ShieldCheck, Sparkles, Target, Users, Zap,
} from "lucide-react";

type Tab = "overview" | "campaigns" | "calendar" | "leads" | "automation" | "compliance";

const nav: { id: Tab; label: string; icon: typeof Target }[] = [
  { id: "overview", label: "Overview", icon: Target },
  { id: "campaigns", label: "Campaign Studio", icon: Megaphone },
  { id: "calendar", label: "Marketing Calendar", icon: CalendarDays },
  { id: "leads", label: "Lead Pipeline", icon: Users },
  { id: "automation", label: "Automation", icon: Zap },
  { id: "compliance", label: "Compliance", icon: ShieldCheck },
];

const initialCampaigns = [
  { name: "SIP: Small Steps, Consistent Habits", channel: "Instagram · Facebook", date: "Mon, Nov 23", status: "Ready for review", tone: "Education" },
  { name: "Mutual Fund NAV Explained", channel: "LinkedIn · WhatsApp", date: "Tue, Nov 24", status: "Draft", tone: "Investor awareness" },
  { name: "SIP vs RD: Understand the Difference", channel: "Instagram Reel", date: "Wed, Nov 25", status: "Draft", tone: "Explainer" },
];

const week = [
  ["MON", "SIP awareness", "Infographic", "Review"],
  ["TUE", "NAV basics", "Carousel", "Draft"],
  ["WED", "SIP vs RD", "Short video", "Draft"],
  ["THU", "Investor awareness", "Static post", "Draft"],
  ["FRI", "Mutual fund myths", "Reel", "Idea"],
  ["SAT", "Financial discipline", "Story", "Idea"],
  ["SUN", "Weekly learning recap", "Carousel", "Idea"],
];

function StatusPill({ children }: { children: React.ReactNode }) {
  const text = String(children);
  const cls = text.toLowerCase().includes("review") ? "bg-amber-50 text-amber-700 ring-amber-200" :
    text.toLowerCase().includes("active") ? "bg-green-50 text-green-700 ring-green-200" :
    text.toLowerCase().includes("blocked") ? "bg-red-50 text-red-700 ring-red-200" :
    "bg-slate-100 text-slate-600 ring-slate-200";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${cls}`}>{children}</span>;
}

function Metric({ title, value, sub, icon: Icon, accent = "green" }: { title: string; value: string; sub: string; icon: typeof Target; accent?: "green" | "gold" | "slate" }) {
  const colors = accent === "gold" ? "bg-amber-50 text-amber-700" : accent === "slate" ? "bg-slate-100 text-slate-700" : "bg-emerald-50 text-emerald-700";
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{title}</p><span className={`rounded-xl p-2 ${colors}`}><Icon size={18}/></span></div><p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{sub}</p></div>;
}

export default function MarketingHubPage() {
  const [active, setActive] = useState<Tab>("overview");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [enabled, setEnabled] = useState([true, true, false, true]);
  const [notice, setNotice] = useState("");

  const title = useMemo(() => nav.find(n => n.id === active)?.label ?? "Overview", [active]);

  const generateDraft = () => {
    if (!prompt.trim()) { setNotice("Enter a campaign topic or objective first."); return; }
    const topic = prompt.trim();
    setDraft(`CAMPAIGN BRIEF — ${topic}\n\nObjective: Educate audiences and invite voluntary enquiries.\n\nENGLISH POST\nLearn one useful concept at a time. ${topic} is an opportunity to understand the basics, ask questions and make informed decisions. Explore educational resources from Luxmi InvestCare.\n\nHINDI POST\nहर दिन एक नई जानकारी सीखें। ${topic} को समझें, सवाल पूछें और जानकारी के आधार पर निर्णय लें। Luxmi InvestCare के शैक्षिक संसाधन देखें।\n\nCTA: Call 9650060044 | Luxmi InvestCare\n\nHashtags: #LuxmiInvestCare #InvestorEducation #MutualFunds #FinancialAwareness\n\nCompliance note: Educational content only. Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully. Review this draft before publishing.`);
    setNotice("Draft generated locally. Review the text and compliance note before using it.");
    setActive("campaigns");
  };

  const addToCalendar = () => {
    if (!prompt.trim()) { setNotice("Add a campaign topic before placing it in the calendar."); return; }
    setCampaigns(prev => [{ name: prompt.trim(), channel: "Content channels to be selected", date: "To be scheduled", status: "Draft", tone: "Education" }, ...prev]);
    setNotice("Campaign added to the local planning list. Publishing integrations are not connected yet.");
    setPrompt("");
  };

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <header className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><span className="h-2 w-2 rounded-full bg-emerald-500"/> LUXMI INVESTCARE <span className="text-slate-400">/</span> AI MARKETING HUB</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Marketing control center</h1><p className="mt-2 text-slate-600">Create educational campaigns, organise content and manage enquiry follow-ups.</p></div>
          <div className="flex flex-wrap gap-2"><button onClick={() => {setActive("campaigns"); setNotice("");}} className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-900"><Sparkles size={16}/> Create campaign</button><button onClick={() => setActive("calendar")} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><CalendarDays size={16}/> Calendar</button></div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[245px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">Workspace</div>
            <div className="space-y-1">{nav.map(({id,label,icon:Icon}) => <button key={id} onClick={() => {setActive(id); setNotice("");}} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${active===id ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={17}/>{label}{id==="leads" && <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">3</span>}</button>)}</div>
            <div className="mt-5 rounded-xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-4 text-white"><div className="flex items-center gap-2 text-emerald-200"><Lightbulb size={16}/><span className="text-xs font-semibold uppercase">AI suggestion</span></div><p className="mt-2 text-sm font-medium leading-5">Build a week of investor-education content around one topic.</p><button onClick={() => {setPrompt("7-day SIP awareness campaign");setActive("campaigns");}} className="mt-3 text-xs font-bold text-amber-300">Start a campaign <ArrowUpRight size={13} className="inline"/></button></div>
          </aside>

          <main className="min-w-0">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2><div className="text-xs text-slate-500">Phase 1 MVP · Prototype workspace</div></div>
            {notice && <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}

            {active === "overview" && <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric title="Campaign drafts" value={String(campaigns.length)} sub="In this planning workspace" icon={Megaphone}/><Metric title="Pending review" value="1" sub="Requires a human review" icon={ShieldCheck} accent="gold"/><Metric title="Follow-ups due" value="3" sub="Sample CRM queue" icon={Clock3} accent="slate"/><Metric title="Automation status" value="4 workflows" sub="Toggle controls are demo-only" icon={Zap}/></div>
              <div className="mt-5 grid gap-5 xl:grid-cols-[1.3fr_1fr]"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h3 className="font-bold">Campaign planner</h3><StatusPill>Weekly plan</StatusPill></div><div className="mt-4 space-y-3">{campaigns.slice(0,3).map((c,i)=><div key={i} className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 p-3"><div><p className="font-semibold text-slate-800">{c.name}</p><p className="mt-1 text-xs text-slate-500">{c.channel} · {c.date}</p></div><StatusPill>{c.status}</StatusPill></div>)}</div><button onClick={()=>setActive("calendar")} className="mt-4 text-sm font-semibold text-emerald-800">View calendar <ArrowUpRight size={14} className="inline"/></button></section><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Quick launch</h3><p className="mt-1 text-sm text-slate-500">Start a marketing workflow from a prompt.</p><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="e.g. Create a 5-post campaign on mutual fund basics..." className="mt-3 min-h-28 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"/><div className="mt-3 flex flex-wrap gap-2"><button onClick={generateDraft} className="rounded-lg bg-emerald-800 px-3 py-2 text-sm font-semibold text-white">Generate draft</button><button onClick={addToCalendar} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">Add plan</button></div></section></div>
              <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h3 className="font-bold">This week at a glance</h3><StatusPill>7 content ideas</StatusPill></div><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{week.slice(0,4).map((w,i)=><div key={i} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold text-emerald-700">{w[0]}</p><p className="mt-1 font-semibold">{w[1]}</p><p className="mt-1 text-xs text-slate-500">{w[2]}</p></div>)}</div></section>
            </>}

            {active === "campaigns" && <section className="grid gap-5 xl:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Campaign brief</h3><p className="mt-1 text-sm text-slate-500">Describe what you want to educate audiences about.</p><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Campaign topic, target audience, goal, preferred format…" className="mt-4 min-h-36 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-600"/><div className="mt-3 flex flex-wrap gap-2"><button onClick={generateDraft} className="rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white">Generate bilingual draft</button><button onClick={addToCalendar} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold">Add to plan</button></div><p className="mt-3 text-xs text-slate-500">Draft generation is a local demo template; live AI generation will be wired to the secured backend.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Draft output</h3>{draft ? <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6">{draft}</pre> : <div className="mt-4 flex min-h-60 items-center justify-center rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500"><div><FileText size={30} className="mx-auto mb-2 text-slate-400"/>Your campaign draft will appear here.</div></div>}</div></section>}

            {active === "calendar" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold">7-day content calendar</h3><StatusPill>Planning only</StatusPill></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{week.map((w,i)=><div key={i} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-wider text-emerald-800">{w[0]}</span><StatusPill>{w[3]}</StatusPill></div><p className="mt-2 font-semibold">{w[1]}</p><p className="mt-1 text-sm text-slate-500">{w[2]}</p><button onClick={()=>{setPrompt(w[1]);setActive("campaigns");}} className="mt-3 text-sm font-semibold text-emerald-800">Create content <ArrowUpRight size={14} className="inline"/></button></div>)}</div></section>}

            {active === "leads" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold">Lead pipeline preview</h3><StatusPill>Demo data</StatusPill></div><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">New enquiries</p><p className="mt-1 text-2xl font-bold">3</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Follow-up queue</p><p className="mt-1 text-2xl font-bold">2</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Opt-out status</p><p className="mt-1 text-2xl font-bold">Tracked</p></div></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="text-xs uppercase text-slate-500"><tr><th className="py-3">Lead ID</th><th>Source</th><th>Status</th><th>Next action</th></tr></thead><tbody className="divide-y divide-slate-100"><tr><td className="py-3 font-medium">LC-001</td><td>Website</td><td><StatusPill>New</StatusPill></td><td>Initial response</td></tr><tr><td className="py-3 font-medium">LC-002</td><td>Google Business</td><td><StatusPill>Contacted</StatusPill></td><td>Follow-up due</td></tr><tr><td className="py-3 font-medium">LC-003</td><td>Social media</td><td><StatusPill>Engaged</StatusPill></td><td>Share education resource</td></tr></tbody></table></div><p className="mt-4 text-xs text-slate-500">Live CRM database and inbound lead integrations are the next backend step. Sample records are not real prospects.</p></section>}

            {active === "automation" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Workflow controls</h3><p className="mt-1 text-sm text-slate-500">Switches in this preview change local UI state only; no messages or posts are sent.</p><div className="mt-4 space-y-3">{["Daily content idea generation","Weekly campaign summary","Compliance screening before review","Follow-up reminders"].map((label,i)=><div key={label} className="flex items-center justify-between rounded-xl border border-slate-100 p-4"><div><p className="font-semibold">{label}</p><p className="mt-1 text-xs text-slate-500">{i===0?"Every morning":i===1?"Every Monday":i===2?"On every draft":"Check pending leads daily"}</p></div><button aria-label={`Toggle ${label}`} onClick={()=>setEnabled(prev=>prev.map((v,j)=>j===i?!v:v))} className={`relative h-6 w-11 rounded-full transition ${enabled[i]?"bg-emerald-700":"bg-slate-300"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled[i]?"left-6":"left-1"}`}/></button></div>)}</div><div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Automations are not connected to external services yet. Production activation will require server-side schedules, secure credentials and consent controls.</div></section>}

            {active === "compliance" && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-bold">Marketing compliance checklist</h3><p className="mt-1 text-sm text-slate-500">Pre-publication screening checklist for educational marketing.</p><div className="mt-4 space-y-2">{["No return guarantees or assured-return language","No misleading performance claims or rankings","No advisory-style or prohibited service claims","Facts, figures and assumptions verified","Hindi and English versions aligned","Risk disclosure included","CTA and distributor identification checked"].map(item=><div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm"><CheckCircle2 size={18} className="shrink-0 text-emerald-700"/><span>{item}</span></div>)}</div><div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><strong>Default disclosure:</strong> Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.<br/><span className="mt-1 block">AMFI-Registered Mutual Fund Distributor · ARN 365140</span></div></section>}

            <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500"><span>Luxmi InvestCare AI Marketing Hub · Phase 1 build</span><span className="flex items-center gap-1"><MessageSquare size={13}/> Human review before publication and outreach</span></footer>
          </main>
        </div>
      </div>
    </div>
  );
}
