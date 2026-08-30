import Link from "next/link";
import type { RowDataPacket } from "mysql2";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface CountRow extends RowDataPacket {
    count: number | string;
}

export default async function AdminDashboardPage() {
    const user = await requireUser();

    const [newRows] = await db.execute<CountRow[]>(
        `SELECT COUNT(*) AS count FROM leads WHERE status = 'New'`,
    );

    const [totalRows] = await db.execute<CountRow[]>(
        `SELECT COUNT(*) AS count FROM leads`,
    );

    const [assignedRows] = await db.execute<CountRow[]>(
        `
        SELECT COUNT(*) AS count
        FROM leads
        WHERE assigned_user_id IS NOT NULL
        `,
    );

    const newCount = Number(newRows[0]?.count ?? 0);
    const totalCount = Number(totalRows[0]?.count ?? 0);
    const assignedCount = Number(
        assignedRows[0]?.count ?? 0,
    );

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                            Luxmi InvestCare
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            Admin Dashboard
                        </h1>

                        <p className="mt-1 text-slate-600">
                            Welcome, {user.fullName}
                        </p>
                    </div>

                    <Link
                        href="/admin/leads"
                        className="rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800"
                    >
                        View Leads
                    </Link>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm text-slate-500">
                            New Leads
                        </p>
                        <p className="mt-2 text-4xl font-bold text-green-700">
                            {newCount}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm text-slate-500">
                            Total Leads
                        </p>
                        <p className="mt-2 text-4xl font-bold text-slate-900">
                            {totalCount}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm text-slate-500">
                            Assigned Leads
                        </p>
                        <p className="mt-2 text-4xl font-bold text-slate-900">
                            {assignedCount}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}