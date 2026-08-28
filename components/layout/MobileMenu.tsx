"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Investor Education", href: "/investor-education" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const mobileMenu =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[9999] lg:hidden">
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            />

            {/* Mobile drawer */}
            <aside
              className="absolute right-0 top-0 flex h-dvh w-[min(88vw,380px)] flex-col bg-white shadow-2xl"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200 px-5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-xl font-bold text-green-700"
                >
                  Luxmi InvestCare
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-5">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-slate-100 px-3 py-4 text-lg font-medium text-slate-800 transition hover:bg-green-50 hover:text-green-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="shrink-0 border-t border-slate-200 p-5">
                <a
                  href="https://wa.me/919650060044"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl bg-green-700 px-5 py-3.5 text-center font-semibold text-white transition hover:bg-green-800"
                >
                  Get Started
                </a>
              </div>
            </aside>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-slate-800 transition hover:bg-green-50 hover:text-green-700 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-7 w-7" />
      </button>

      {mobileMenu}
    </>
  );
}