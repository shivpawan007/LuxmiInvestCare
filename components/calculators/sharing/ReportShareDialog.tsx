"use client";

import { useState } from "react";
import {
    Mail,
    MessageCircle,
    QrCode,
    X,
    Copy,
    Check,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import LeadCaptureForm from "./LeadCaptureForm";
import {
    recordReportShare,
    type CalculatorType,
} from "./reportShare";

interface ReportShareDialogProps {
    open: boolean;
    onClose: () => void;

    calculatorType: CalculatorType;
    reportTitle: string;

    investment: number;
    years: number;
    annualReturn: number;
    estimatedReturns: number;
    maturityValue: number;
}

interface LeadDetails {
    customerName: string;
    mobile: string;
    email: string;
}

export default function ReportShareDialog({
    open,
    onClose,
    calculatorType,
    reportTitle,
    investment,
    years,
    annualReturn,
    estimatedReturns,
    maturityValue,
}: ReportShareDialogProps) {
    const [lead, setLead] = useState<LeadDetails | null>(null);
    const [copied, setCopied] = useState(false);

    if (!open) {
        return null;
    }

    const reportUrl =
        typeof window !== "undefined"
            ? window.location.href
            : "https://www.luxmiinvestcare.com";

    const formatCurrency = (value: number) =>
        `₹${Math.round(value).toLocaleString("en-IN")}`;

    const shareMessage =
        `Luxmi InvestCare\n` +
        `${reportTitle}\n\n` +
        `Investment: ${formatCurrency(investment)}\n` +
        `Expected Annual Return: ${annualReturn}%\n` +
        `Investment Period: ${years} Years\n` +
        `Estimated Returns: ${formatCurrency(estimatedReturns)}\n` +
        `Projected Maturity Value: ${formatCurrency(maturityValue)}\n\n` +
        `View calculator: ${reportUrl}\n\n` +
        `Investor Education Disclaimer: This illustration is based on assumed returns and is not a guarantee of future performance. Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.`;

    function handleLeadSubmit(details: LeadDetails) {
        setLead(details);
    }

    function shareWhatsApp() {
        if (!lead) return;

        recordReportShare({
            calculatorType,
            reportTitle,
            customerName: lead.customerName,
            mobile: lead.mobile,
            email: lead.email,
            investment,
            years,
            annualReturn,
            estimatedReturns,
            maturityValue,
            action: "whatsapp",
        });

        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    function shareEmail() {
        if (!lead) return;

        recordReportShare({
            calculatorType,
            reportTitle,
            customerName: lead.customerName,
            mobile: lead.mobile,
            email: lead.email,
            investment,
            years,
            annualReturn,
            estimatedReturns,
            maturityValue,
            action: "email",
        });

        window.location.href =
            `mailto:${lead.email || ""}` +
            `?subject=${encodeURIComponent(reportTitle)}` +
            `&body=${encodeURIComponent(shareMessage)}`;
    }

    function showQRCode() {
        if (!lead) return;

        recordReportShare({
            calculatorType,
            reportTitle,
            customerName: lead.customerName,
            mobile: lead.mobile,
            email: lead.email,
            investment,
            years,
            annualReturn,
            estimatedReturns,
            maturityValue,
            action: "qr",
        });
    }

    async function copyReport() {
        if (!lead) return;

        try {
            await navigator.clipboard.writeText(shareMessage);

            recordReportShare({
                calculatorType,
                reportTitle,
                customerName: lead.customerName,
                mobile: lead.mobile,
                email: lead.email,
                investment,
                years,
                annualReturn,
                estimatedReturns,
                maturityValue,
                action: "generated",
            });

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Unable to copy report:", error);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-share-title"
        >
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                            Share Report
                        </p>

                        <h2
                            id="report-share-title"
                            className="mt-1 text-xl font-bold text-slate-900"
                        >
                            {reportTitle}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {!lead ? (
                        <>
                            <div className="mb-6 rounded-xl border border-green-100 bg-green-50 p-4">
                                <p className="text-sm leading-6 text-green-900">
                                    Enter your contact details to share this
                                    investor education report through WhatsApp,
                                    Email or QR Code.
                                </p>
                            </div>

                            <LeadCaptureForm
                                onSubmit={handleLeadSubmit}
                                onCancel={onClose}
                            />
                        </>
                    ) : (
                        <>
                            {/* Success message */}
                            <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                                <p className="text-sm font-semibold text-green-900">
                                    Details captured successfully.
                                </p>

                                <p className="mt-1 text-xs text-green-800">
                                    Choose how you would like to share the report.
                                </p>
                            </div>

                            {/* Share actions */}
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={shareWhatsApp}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                                >
                                    <MessageCircle className="h-5 w-5" />
                                    Share on WhatsApp
                                </button>

                                <button
                                    type="button"
                                    onClick={shareEmail}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                >
                                    <Mail className="h-5 w-5" />
                                    Share by Email
                                </button>

                                <button
                                    type="button"
                                    onClick={showQRCode}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-100"
                                >
                                    <QrCode className="h-5 w-5" />
                                    Show QR Code
                                </button>

                                <button
                                    type="button"
                                    onClick={copyReport}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-5 w-5" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-5 w-5" />
                                            Copy Report
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Report Preview */}
                            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p className="text-sm font-semibold text-slate-800">
                                    Report Preview
                                </p>

                                <div className="mt-4 space-y-3 text-sm text-slate-600">
                                    <p>
                                        Investment:{" "}
                                        <strong className="text-slate-900">
                                            {formatCurrency(investment)}
                                        </strong>
                                    </p>

                                    <p>
                                        Expected Return:{" "}
                                        <strong className="text-slate-900">
                                            {annualReturn}%
                                        </strong>
                                    </p>

                                    <p>
                                        Period:{" "}
                                        <strong className="text-slate-900">
                                            {years} Years
                                        </strong>
                                    </p>

                                    <p>
                                        Estimated Returns:{" "}
                                        <strong className="text-green-700">
                                            {formatCurrency(estimatedReturns)}
                                        </strong>
                                    </p>

                                    <p>
                                        Projected Value:{" "}
                                        <strong className="text-emerald-700">
                                            {formatCurrency(maturityValue)}
                                        </strong>
                                    </p>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="mt-6 rounded-2xl border border-green-100 bg-white p-6 text-center">
                                <QRCodeSVG
                                    value={reportUrl}
                                    size={180}
                                    level="M"
                                    includeMargin
                                />

                                <p className="mt-3 text-xs text-slate-500">
                                    Scan to open the Luxmi InvestCare
                                    calculator/report page.
                                </p>
                            </div>

                            {/* Done */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                                >
                                    Done
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}