"use client";

import { useState } from "react";

interface LeadCaptureFormProps {
    onSubmit: (details: {
        customerName: string;
        mobile: string;
        email: string;
    }) => void;

    onCancel?: () => void;
}

export default function LeadCaptureForm({
    onSubmit,
    onCancel,
}: LeadCaptureFormProps) {
    const [
        customerName,
        setCustomerName,
    ] = useState("");

    const [
        mobile,
        setMobile,
    ] = useState("");

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        error,
        setError,
    ] = useState("");

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const cleanMobile =
            mobile.replace(
                /\D/g,
                "",
            );

        if (!customerName.trim()) {
            setError(
                "Please enter your name.",
            );
            return;
        }

        if (
            cleanMobile.length !==
            10
        ) {
            setError(
                "Please enter a valid 10-digit mobile number.",
            );
            return;
        }

        if (
            email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email,
            )
        ) {
            setError(
                "Please enter a valid email address.",
            );
            return;
        }

        setError("");

        onSubmit({
            customerName:
                customerName.trim(),

            mobile:
                cleanMobile,

            email:
                email.trim(),
        });
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
            className="space-y-5"
        >

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Name
                </label>

                <input
                    type="text"
                    value={
                        customerName
                    }
                    onChange={(
                        event,
                    ) =>
                        setCustomerName(
                            event.target.value,
                        )
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    autoComplete="name"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Mobile Number{" "}
                    <span className="text-red-600">
                        *
                    </span>
                </label>

                <input
                    type="tel"
                    value={mobile}
                    onChange={(
                        event,
                    ) =>
                        setMobile(
                            event.target.value
                                .replace(
                                    /\D/g,
                                    "",
                                )
                                .slice(
                                    0,
                                    10,
                                ),
                        )
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Email Address
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={(
                        event,
                    ) =>
                        setEmail(
                            event.target.value,
                        )
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    autoComplete="email"
                />
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                {onCancel && (
                    <button
                        type="button"
                        onClick={
                            onCancel
                        }
                        className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                >
                    Continue
                </button>

            </div>

            <p className="text-xs leading-5 text-slate-500">
                Your details help Luxmi InvestCare respond to your
                investor education and information enquiry.
            </p>

        </form>
    );
}