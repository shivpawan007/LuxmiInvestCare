"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Lead = {
    id: number;
    fullName: string;
    mobile: string;
    email: string | null;
    enquiry: string | null;
    leadSource: string;
    landingPage: string | null;
    status: string;
    priority: string;
    assignedUserId: number | null;
    assignedUserName: string | null;
    assignedUserEmail: string | null;
    lastContactedAt: string | null;
    createdAt: string;
};

type Activity = {
    id: number;
    activityType: string;
    activityNote: string | null;
    userName: string | null;
    createdAt: string;
};

type AssignableUser = {
    id: number;
    fullName: string;
    email: string;
    roleKey: string;
};

const statuses = [
    "New",
    "Contacted",
    "Follow-up",
    "Converted",
    "Closed",
    "Lost",
];

const priorities = [
    "Low",
    "Normal",
    "High",
    "Urgent",
];

export default function LeadDetailPage() {
    const params =
        useParams<{ id: string }>();

    const router = useRouter();

    const leadId = params.id;

    const [lead, setLead] =
        useState<Lead | null>(null);

    const [activities, setActivities] =
        useState<Activity[]>([]);

    const [users, setUsers] =
        useState<AssignableUser[]>([]);

    const [currentUserRole, setCurrentUserRole] =
        useState("");

    const [note, setNote] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    async function loadLead() {
        try {
            setLoading(true);

            const response = await fetch(
                `/api/admin/leads/${leadId}`,
                {
                    cache: "no-store",
                },
            );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to load lead.",
                );
                return;
            }

            setLead(data.lead);
            setActivities(
                data.activities || [],
            );
            setUsers(
                data.assignableUsers || [],
            );
            setCurrentUserRole(
                data.currentUserRole || "",
            );
        } catch {
            setError(
                "Unable to load lead.",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadLead();
    }, [leadId]);

    async function updateLead(
        updates: Record<
            string,
            unknown
        >,
    ) {
        setSaving(true);
        setError("");

        try {
            const response =
                await fetch(
                    `/api/admin/leads/${leadId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            updates,
                        ),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to update lead.",
                );
                return;
            }

            await loadLead();
        } catch {
            setError(
                "Unable to update lead.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function addNote() {
        const cleanNote =
            note.trim();

        if (!cleanNote) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            const response =
                await fetch(
                    `/api/admin/leads/${leadId}/activities`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            type: "NOTE_ADDED",
                            note: cleanNote,
                        }),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to save note.",
                );
                return;
            }

            setNote("");
            await loadLead();
        } catch {
            setError(
                "Unable to save note.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function recordActivity(
        type:
            | "CALL_ATTEMPTED"
            | "WHATSAPP_OPENED"
            | "EMAIL_OPENED",
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

            await loadLead();
        } catch {
            // The contact action should still work
            // even if activity logging fails.
        }
    }

    function callLead() {
        if (!lead) return;

        void recordActivity(
            "CALL_ATTEMPTED",
        );

        window.location.href =
            `tel:+91${lead.mobile}`;
    }

    function openWhatsApp() {
        if (!lead) return;

        void recordActivity(
            "WHATSAPP_OPENED",
        );

        window.open(
            `https://wa.me/91${lead.mobile}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    function openEmail() {
        if (!lead?.email) return;

        void recordActivity(
            "EMAIL_OPENED",
        );

        window.location.href =
            `mailto:${lead.email}`;
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 p-6">
                Loading lead...
            </main>
        );
    }

    if (!lead) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl bg-white p-8 shadow-sm">
                        <h1 className="text-2xl font-bold">
                            Lead not found
                        </h1>

                        <Link
                            href="/admin/leads"
                            className="mt-5 inline-block text-green-700"
                        >
                            ← Back to Leads
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const canAssign =
        currentUserRole === "ADMIN" ||
        currentUserRole === "MANAGER";

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6">
                    <Link
                        href="/admin/leads"
                        className="text-sm font-semibold text-green-700"
                    >
                        ← Back to Leads
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <section className="space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Lead #
                                        {lead.id}
                                    </p>

                                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                                        {
                                            lead.fullName
                                        }
                                    </h1>

                                    <div className="mt-3 space-y-1 text-slate-600">
                                        <p>
                                            {
                                                lead.mobile
                                            }
                                        </p>

                                        {lead.email && (
                                            <p>
                                                {
                                                    lead.email
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                                    {
                                        lead.status
                                    }
                                </span>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <button
                                    type="button"
                                    onClick={
                                        callLead
                                    }
                                    className="rounded-xl bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
                                >
                                    Call
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        openWhatsApp
                                    }
                                    className="rounded-xl border border-green-700 px-4 py-3 font-semibold text-green-700 hover:bg-green-50"
                                >
                                    WhatsApp
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        openEmail
                                    }
                                    disabled={
                                        !lead.email
                                    }
                                    className="rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Email
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                Enquiry
                            </h2>

                            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
                                {lead.enquiry ||
                                    "No enquiry details provided."}
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Source
                                    </p>

                                    <p className="mt-1 text-sm font-medium">
                                        {
                                            lead.leadSource
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Landing Page
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">
                                        {
                                            lead.landingPage ||
                                                "—"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                Add Note
                            </h2>

                            <textarea
                                value={note}
                                onChange={(
                                    event,
                                ) =>
                                    setNote(
                                        event.target
                                            .value,
                                    )
                                }
                                rows={4}
                                placeholder="Record what happened during the conversation..."
                                className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <button
                                type="button"
                                onClick={
                                    addNote
                                }
                                disabled={
                                    saving ||
                                    !note.trim()
                                }
                                className="mt-3 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Note"}
                            </button>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                Activity Timeline
                            </h2>

                            <div className="mt-5 space-y-4">
                                {activities.length ===
                                0 ? (
                                    <p className="text-sm text-slate-500">
                                        No activities yet.
                                    </p>
                                ) : (
                                    activities.map(
                                        (
                                            activity,
                                        ) => (
                                            <div
                                                key={
                                                    activity.id
                                                }
                                                className="rounded-xl border border-slate-200 p-4"
                                            >
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="font-semibold text-slate-900">
                                                        {
                                                            activity.activityType
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {
                                                            activity.createdAt
                                                        }
                                                    </p>
                                                </div>

                                                {activity.activityNote && (
                                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                                        {
                                                            activity.activityNote
                                                        }
                                                    </p>
                                                )}

                                                {activity.userName && (
                                                    <p className="mt-2 text-xs text-slate-400">
                                                        By{" "}
                                                        {
                                                            activity.userName
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        ),
                                    )
                                )}
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                Lead Control
                            </h2>

                            <label className="mt-5 block text-sm font-semibold text-slate-800">
                                Status
                            </label>

                            <select
                                value={
                                    lead.status
                                }
                                onChange={(
                                    event,
                                ) =>
                                    void updateLead(
                                        {
                                            status:
                                                event
                                                    .target
                                                    .value,
                                        },
                                    )
                                }
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            >
                                {statuses.map(
                                    (
                                        status,
                                    ) => (
                                        <option
                                            key={
                                                status
                                            }
                                            value={
                                                status
                                            }
                                        >
                                            {
                                                status
                                            }
                                        </option>
                                    ),
                                )}
                            </select>

                            <label className="mt-5 block text-sm font-semibold text-slate-800">
                                Priority
                            </label>

                            <select
                                value={
                                    lead.priority
                                }
                                onChange={(
                                    event,
                                ) =>
                                    void updateLead(
                                        {
                                            priority:
                                                event
                                                    .target
                                                    .value,
                                        },
                                    )
                                }
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            >
                                {priorities.map(
                                    (
                                        priority,
                                    ) => (
                                        <option
                                            key={
                                                priority
                                            }
                                            value={
                                                priority
                                            }
                                        >
                                            {
                                                priority
                                            }
                                        </option>
                                    ),
                                )}
                            </select>

                            <label className="mt-5 block text-sm font-semibold text-slate-800">
                                Assigned To
                            </label>

                            {canAssign ? (
                                <select
                                    value={
                                        lead.assignedUserId ??
                                        ""
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        void updateLead(
                                            {
                                                assignedUserId:
                                                    event
                                                        .target
                                                        .value
                                                        ? Number(
                                                              event
                                                                  .target
                                                                  .value,
                                                          )
                                                        : null,
                                            },
                                        )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                >
                                    <option value="">
                                        Unassigned
                                    </option>

                                    {users.map(
                                        (
                                            assignedUser,
                                        ) => (
                                            <option
                                                key={
                                                    assignedUser.id
                                                }
                                                value={
                                                    assignedUser.id
                                                }
                                            >
                                                {
                                                    assignedUser.fullName
                                                }{" "}
                                                (
                                                {
                                                    assignedUser.roleKey
                                                }
                                                )
                                            </option>
                                        ),
                                    )}
                                </select>
                            ) : (
                                <div className="mt-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                    {lead.assignedUserName ||
                                        "Unassigned"}
                                </div>
                            )}

                            <p className="mt-5 text-xs leading-5 text-slate-400">
                                Changes are recorded in the lead activity history.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-xl font-bold text-slate-900">
                                Lead Information
                            </h2>

                            <div className="mt-5 space-y-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Created
                                    </p>

                                    <p className="mt-1 text-sm text-slate-700">
                                        {
                                            lead.createdAt
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        Last Contact
                                    </p>

                                    <p className="mt-1 text-sm text-slate-700">
                                        {
                                            lead.lastContactedAt ||
                                                "No recorded contact"
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}