"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CurrentUser = {
    id: number;
    fullName: string;
    email: string;
    roleKey: string;
    roleName?: string;
};

export default function AccountPage() {
    const [user, setUser] =
        useState<CurrentUser | null>(
            null,
        );

    const [
        currentPassword,
        setCurrentPassword,
    ] = useState("");

    const [
        newPassword,
        setNewPassword,
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    useEffect(() => {
        async function loadUser() {
            try {
                const response =
                    await fetch(
                        "/api/auth/me",
                        {
                            cache:
                                "no-store",
                        },
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    setError(
                        data.error ||
                            "Unable to load account.",
                    );
                    return;
                }

                setUser(
                    data.user ??
                        data,
                );
            } catch {
                setError(
                    "Unable to load account.",
                );
            } finally {
                setLoading(false);
            }
        }

        void loadUser();
    }, []);

    async function changePassword(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response =
                await fetch(
                    "/api/auth/change-password",
                    {
                        method:
                            "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            {
                                currentPassword,
                                newPassword,
                                confirmPassword,
                            },
                        ),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to change password.",
                );
                return;
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setSuccess(
                "Password changed successfully.",
            );
        } catch {
            setError(
                "Unable to change password.",
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    Loading account...
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 py-10">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Account unavailable
                        </h1>

                        <p className="mt-2 text-slate-600">
                            {error ||
                                "Please log in again."}
                        </p>

                        <Link
                            href="/admin/login"
                            className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8">
                    <Link
                        href="/admin/dashboard"
                        className="text-sm font-semibold text-green-700"
                    >
                        ← Back to Dashboard
                    </Link>

                    <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-700">
                        Luxmi InvestCare
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        My Account
                    </h1>

                    <p className="mt-1 text-slate-600">
                        Manage your account information and password.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                        {success}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            Account Information
                        </h2>

                        <div className="mt-6 space-y-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Name
                                </p>

                                <p className="mt-1 text-lg font-semibold text-slate-900">
                                    {
                                        user.fullName
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 text-slate-700">
                                    {
                                        user.email
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Role
                                </p>

                                <span className="mt-2 inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                                    {user.roleName ||
                                        user.roleKey}
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            Change Password
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Choose a strong password that you do not use on another website.
                        </p>

                        <form
                            onSubmit={
                                changePassword
                            }
                            className="mt-6 space-y-5"
                        >
                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    value={
                                        currentPassword
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        setCurrentPassword(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    autoComplete="current-password"
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    value={
                                        newPassword
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        setNewPassword(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Minimum 8 characters.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Confirm New Password
                                </label>

                                <input
                                    type="password"
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        setConfirmPassword(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={
                                    saving
                                }
                                className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving
                                    ? "Changing Password..."
                                    : "Change Password"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}