"use client";

import {
    useEffect,
    useState,
} from "react";

type User = {
    id: number;
    fullName: string;
    email: string;
    mobile: string | null;
    roleKey: string;
    roleName: string;
    isActive: number;
    createdAt: string;
    lastLoginAt: string | null;
};

type Role = {
    id: number;
    roleKey: string;
    roleName: string;
};

export default function UsersPage() {
    const [users, setUsers] =
        useState<User[]>([]);

    const [roles, setRoles] =
        useState<Role[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [form, setForm] =
        useState({
            fullName: "",
            email: "",
            mobile: "",
            roleKey: "STAFF",
            password: "",
        });

    async function loadUsers() {
        try {
            setLoading(true);
            setError("");

            const response =
                await fetch(
                    "/api/admin/users",
                    {
                        cache: "no-store",
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to load users.",
                );
                return;
            }

            setUsers(
                data.users || [],
            );

            setRoles(
                data.roles || [],
            );
        } catch {
            setError(
                "Unable to load users.",
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadUsers();
    }, []);

    function updateField(
        field:
            | "fullName"
            | "email"
            | "mobile"
            | "roleKey"
            | "password",
        value: string,
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function createUser(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response =
                await fetch(
                    "/api/admin/users",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify(
                            form,
                        ),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to create user.",
                );
                return;
            }

            setSuccess(
                "User created successfully.",
            );

            setForm({
                fullName: "",
                email: "",
                mobile: "",
                roleKey: "STAFF",
                password: "",
            });

            setShowForm(false);

            await loadUsers();
        } catch {
            setError(
                "Unable to create user.",
            );
        } finally {
            setSaving(false);
        }
    }

    async function toggleUser(
        user: User,
    ) {
        if (
            !window.confirm(
                user.isActive
                    ? `Deactivate ${user.fullName}?`
                    : `Activate ${user.fullName}?`,
            )
        ) {
            return;
        }

        setError("");
        setSuccess("");

        try {
            const response =
                await fetch(
                    `/api/admin/users/${user.id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            isActive:
                                !Boolean(
                                    user.isActive,
                                ),
                        }),
                    },
                );

            const data =
                await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                        "Unable to update user.",
                );
                return;
            }

            setSuccess(
                user.isActive
                    ? "User deactivated."
                    : "User activated.",
            );

            await loadUsers();
        } catch {
            setError(
                "Unable to update user.",
            );
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
                            Luxmi InvestCare
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            User Management
                        </h1>

                        <p className="mt-1 text-slate-600">
                            Create and manage administrators, managers and staff users.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setShowForm(
                                (current) =>
                                    !current,
                            )
                        }
                        className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                    >
                        {showForm
                            ? "Close Form"
                            : "+ Create User"}
                    </button>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                        {success}
                    </div>
                )}

                {showForm && (
                    <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            Create User
                        </h2>

                        <form
                            onSubmit={
                                createUser
                            }
                            className="mt-5 grid gap-5 md:grid-cols-2"
                        >
                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Full Name
                                </label>

                                <input
                                    value={
                                        form.fullName
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        updateField(
                                            "fullName",
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    placeholder="Staff member name"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        updateField(
                                            "email",
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    placeholder="staff@luxmiinvestcare.com"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Mobile
                                </label>

                                <input
                                    type="tel"
                                    value={
                                        form.mobile
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        updateField(
                                            "mobile",
                                            event
                                                .target
                                                .value
                                                .replace(
                                                    /\D/g,
                                                    "",
                                                ),
                                        )
                                    }
                                    maxLength={10}
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    placeholder="10-digit mobile"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-800">
                                    Role
                                </label>

                                <select
                                    value={
                                        form.roleKey
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        updateField(
                                            "roleKey",
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                >
                                    {roles.map(
                                        (
                                            role,
                                        ) => (
                                            <option
                                                key={
                                                    role.id
                                                }
                                                value={
                                                    role.roleKey
                                                }
                                            >
                                                {
                                                    role.roleName
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-semibold text-slate-800">
                                    Temporary Password
                                </label>

                                <input
                                    type="password"
                                    value={
                                        form.password
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        updateField(
                                            "password",
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    required
                                    minLength={8}
                                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                                    placeholder="Minimum 8 characters"
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    The password is stored as a secure bcrypt hash.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white disabled:opacity-50"
                                >
                                    {saving
                                        ? "Creating..."
                                        : "Create User"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(
                                            false,
                                        )
                                    }
                                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {loading ? (
                        <div className="p-8 text-center text-slate-500">
                            Loading users...
                        </div>
                    ) : (
                        <table className="min-w-full text-left">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Role
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Last Login
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(
                                    (
                                        user,
                                    ) => (
                                        <tr
                                            key={
                                                user.id
                                            }
                                            className="border-b border-slate-100"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-slate-900">
                                                    {
                                                        user.fullName
                                                    }
                                                </p>

                                                <p className="text-sm text-slate-600">
                                                    {
                                                        user.email
                                                    }
                                                </p>

                                                {user.mobile && (
                                                    <p className="text-xs text-slate-400">
                                                        {
                                                            user.mobile
                                                        }
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                                    {
                                                        user.roleName
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        user.isActive
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
                                                    }`}
                                                >
                                                    {user.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {
                                                    user.lastLoginAt ||
                                                        "Never"
                                                }
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleUser(
                                                            user,
                                                        )
                                                    }
                                                    disabled={
                                                        user.roleKey ===
                                                            "ADMIN" &&
                                                        user.email ===
                                                            "admin@luxmiinvestcare.com"
                                                    }
                                                    className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                                                        user.isActive
                                                            ? "border border-red-300 text-red-700 hover:bg-red-50"
                                                            : "bg-green-700 text-white hover:bg-green-800"
                                                    } disabled:cursor-not-allowed disabled:opacity-40`}
                                                >
                                                    {user.isActive
                                                        ? "Deactivate"
                                                        : "Activate"}
                                                </button>
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    )}

                    {!loading &&
                        users.length === 0 && (
                            <div className="p-10 text-center text-slate-500">
                                No users found.
                            </div>
                        )}
                </section>
            </div>
        </main>
    );
}