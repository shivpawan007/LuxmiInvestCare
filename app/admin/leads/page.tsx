"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Lead = {
    id: number;
    fullName: string;
    mobile: string;
    email: string | null;
    enquiry: string | null;
    leadSource: string;
    status: string;
    priority: string;
    assignedUserName: string | null;
    createdAt: string;
};

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLeads() {
            try {
                const response = await fetch(
                    "/api/admin/leads",
                    {
                        cache: "no-store",
                    },
                );

                const data =
                    await response.json();

                if (!response.ok) {
                    setError(
                        data.error ||
                            "Unable to load leads.",
                    );
                    return;
                }

                setLeads(
                    data.leads || [],
                );
            } catch {
                setError(
                    "Unable to load leads.",
                );
            } finally {
                setLoading(false);
            }
        }

        loadLeads();
    }, []);

    async function recordActivity(
        leadId: number,
        type: string,
    ) {
        try {
            await fetch(
                `/api/admin/leads/${leadId}/activities`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        type,
                    }),
                },
            );
        } catch (error) {
            console.error(
                "ACTIVITY_ERROR",
                error,
            );
        }
    }

    function callLead(
        lead: Lead,
    ) {
        void recordActivity(
            lead.id,
            "CALL_ATTEMPTED",
        );

        window.location.href =
            `tel:+91${lead.mobile}`;
    }

    function openWhatsApp(
        lead: Lead,
    ) {
        void recordActivity(
            lead.id,
            "WHATSAPP_OPENED",
        );

        window.open(
            `https://wa.me/91${lead.mobile}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 p-6">
                Loading leads...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                        Luxmi InvestCare
                    </p>

                    <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Lead Management
                            </h1>

                            <p className="mt-1 text-slate-600">
                                Manage website enquiries and customer follow-ups.
                            </p>
                        </div>

                        <div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-200">
                            Total Leads:{" "}
                            <strong className="text-green-700">
                                {leads.length}
                            </strong>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {/* Mobile */}
                <div className="space-y-4 md:hidden">
                    {leads.map(
                        (lead) => (
                            <div
                                key={lead.id}
                                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            Lead #
                                            {lead.id}
                                        </p>

                                        <h2 className="mt-1 font-bold text-slate-900">
                                            {lead.fullName}
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {lead.mobile}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                        {lead.status}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm">
                                    {lead.email && (
                                        <p className="text-slate-600">
                                            {lead.email}
                                        </p>
                                    )}

                                    {lead.enquiry && (
                                        <p className="whitespace-pre-wrap leading-6 text-slate-700">
                                            {lead.enquiry}
                                        </p>
                                    )}

                                    <p className="text-xs text-slate-400">
                                        {lead.leadSource}
                                        {" • "}
                                        {lead.priority}
                                        {" • "}
                                        {lead.assignedUserName ||
                                            "Unassigned"}
                                    </p>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <Link
                                        href={`/admin/leads/${lead.id}`}
                                        className="rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white"
                                    >
                                        View Lead
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            callLead(
                                                lead,
                                            )
                                        }
                                        className="rounded-xl bg-green-700 px-4 py-3 font-semibold text-white"
                                    >
                                        Call
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openWhatsApp(
                                                lead,
                                            )
                                        }
                                        className="rounded-xl border border-green-700 px-4 py-3 font-semibold text-green-700"
                                    >
                                        WhatsApp
                                    </button>
                                </div>
                            </div>
                        ),
                    )}
                </div>

                {/* Desktop */}
                <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:block">
                    <table className="min-w-full text-left">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-5 py-4 text-sm font-semibold">
                                    Lead
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Contact
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Source
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Assigned
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {leads.map(
                                (lead) => (
                                    <tr
                                        key={lead.id}
                                        className="border-b border-slate-100"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-xs text-slate-400">
                                                Lead #
                                                {
                                                    lead.id
                                                }
                                            </p>

                                            <p className="font-semibold text-slate-900">
                                                {
                                                    lead.fullName
                                                }
                                            </p>

                                            <p className="mt-1 max-w-xs truncate text-sm text-slate-600">
                                                {
                                                    lead.enquiry
                                                }
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-700">
                                            {
                                                lead.mobile
                                            }

                                            <br />

                                            {
                                                lead.email ||
                                                    "—"
                                            }
                                        </td>

                                        <td className="px-5 py-4 text-sm">
                                            {
                                                lead.leadSource
                                            }

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    lead.priority
                                                }
                                            </p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                {
                                                    lead.status
                                                }
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm">
                                            {
                                                lead.assignedUserName ||
                                                    "Unassigned"
                                            }
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    href={`/admin/leads/${lead.id}`}
                                                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                                                >
                                                    View
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        callLead(
                                                            lead,
                                                        )
                                                    }
                                                    className="rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white"
                                                >
                                                    Call
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openWhatsApp(
                                                            lead,
                                                        )
                                                    }
                                                    className="rounded-lg border border-green-700 px-3 py-2 text-xs font-semibold text-green-700"
                                                >
                                                    WhatsApp
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>

                {!leads.length && (
                    <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
                        No leads yet.
                    </div>
                )}
            </div>
        </main>
    );
}