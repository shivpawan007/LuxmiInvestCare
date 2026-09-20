"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/platform", label: "Dashboard" },
  { href: "/platform/markets", label: "Markets" },
  { href: "/platform/watchlist", label: "Watchlist" },
  { href: "/platform/portfolio", label: "Portfolio" },
  { href: "/platform/paper-trading", label: "Paper Trading" },
];

export default function PlatformNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/platform" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-sm font-black text-white">
            LI
          </div>
          <div>
            <p className="text-sm font-bold text-white">Luxmi InvestCare</p>
            <p className="text-[11px] text-slate-400">Investor Platform v2.0</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Investor platform">
          {tabs.map((tab) => {
            const active =
              tab.href === "/platform"
                ? pathname === "/platform"
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white",
                ].join(" ")}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 sm:inline-flex">
            Demo / UAT
          </span>
          <Link
            href="/"
            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white"
          >
            Website
          </Link>
        </div>
      </div>

      <nav
        className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto border-t border-slate-800 px-4 py-2 lg:hidden sm:px-6"
        aria-label="Investor platform mobile navigation"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900"
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
