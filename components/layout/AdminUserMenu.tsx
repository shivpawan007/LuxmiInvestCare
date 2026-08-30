"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    KeyRound,
    LogOut,
    UserCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type CurrentUser = {
    id?: number;
    fullName: string;
    email: string;
    mobile?: string | null;
    roleKey: string;
    roleName?: string;
};

export default function AdminUserMenu() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] =
        useState<CurrentUser | null>(null);

    const menuRef =
        useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadUser() {
            try {
                const response = await fetch(
                    "/api/auth/me",
                    {
                        method: "GET",
                        cache: "no-store",
                        credentials: "include",
                    },
                );

                if (!response.ok) {
                    if (!cancelled) {
                        setUser(null);
                    }

                    return;
                }

                const data =
                    await response.json();

                if (!cancelled) {
                    setUser(
                        data.user ?? null,
                    );
                }
            } catch {
                if (!cancelled) {
                    setUser(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadUser();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        function handleClick(
            event: MouseEvent,
        ) {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node,
                )
            ) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClick,
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClick,
            );
        };
    }, []);

    async function logout() {
        try {
            await fetch(
                "/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include",
                },
            );
        } finally {
            setOpen(false);
            setUser(null);

            router.replace(
                "/admin/login",
            );

            router.refresh();
        }
    }

    /*
     * Do not display anything while the
     * authentication state is being checked.
     */
    if (loading) {
        return null;
    }

    /*
     * Unauthenticated users must not see
     * the Account menu.
     */
    if (!user) {
        return null;
    }

    const initials =
        user.fullName
            ?.split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) =>
                part[0]?.toUpperCase(),
            )
            .join("") || "U";

    return (
        <div
            ref={menuRef}
            className="relative"
        >
            <button
                type="button"
                onClick={() =>
                    setOpen(
                        (current) =>
                            !current,
                    )
                }
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-green-300 hover:bg-green-50"
                aria-expanded={open}
                aria-haspopup="menu"
            >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
                    {initials}
                </span>

                <span className="hidden text-left sm:block">
                    <span className="block max-w-40 truncate text-sm font-semibold text-slate-900">
                        {user.fullName}
                    </span>

                    <span className="block text-xs text-slate-500">
                        {user.roleName ||
                            user.roleKey}
                    </span>
                </span>

                <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition ${
                        open
                            ? "rotate-180"
                            : ""
                    }`}
                />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 z-[100] mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                    <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                        <p className="font-semibold text-slate-900">
                            {user.fullName}
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-500">
                            {user.email}
                        </p>

                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                            {user.roleName ||
                                user.roleKey}
                        </p>
                    </div>

                    <div className="p-2">
                        <Link
                            href="/admin/dashboard"
                            onClick={() =>
                                setOpen(
                                    false,
                                )
                            }
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <UserCircle className="h-5 w-5 text-green-700" />
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/account"
                            onClick={() =>
                                setOpen(
                                    false,
                                )
                            }
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <UserCircle className="h-5 w-5 text-green-700" />
                            My Account
                        </Link>

                        <Link
                            href="/admin/account"
                            onClick={() =>
                                setOpen(
                                    false,
                                )
                            }
                            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            <KeyRound className="h-5 w-5 text-green-700" />
                            Change Password
                        </Link>

                        <div className="my-2 border-t border-slate-100" />

                        <button
                            type="button"
                            onClick={() =>
                                void logout()
                            }
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}