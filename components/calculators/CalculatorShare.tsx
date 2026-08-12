"use client";

import { Copy, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CalculatorShareProps {
    title: string;
    summary: string;
}

export default function CalculatorShare({
    title,
    summary,
}: CalculatorShareProps) {
    const shareText = `${title}\n\n${summary}\n\nGenerated using Luxmi InvestCare`;

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(shareText);
        alert("Calculation copied to clipboard.");
    };

    const shareWhatsApp = () => {
        window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
        );
    };

    const shareNative = async () => {
        if (navigator.share) {
            await navigator.share({
                title,
                text: shareText,
            });
        } else {
            copyToClipboard();
        }
    };

    return (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <h2 className="text-2xl font-bold">
                Share Your Results
            </h2>

            <p className="mt-2 text-slate-600">
                Save or share this educational calculation with family or friends.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

                <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Copy className="h-5 w-5" />
                    Copy
                </Button>

                <Button
                    onClick={shareWhatsApp}
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800"
                >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                </Button>

                <Button
                    onClick={shareNative}
                    variant="secondary"
                    className="flex items-center gap-2"
                >
                    <Share2 className="h-5 w-5" />
                    Share
                </Button>

            </div>

        </div>
    );
}