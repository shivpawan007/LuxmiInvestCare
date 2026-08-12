"use client";

import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DownloadReportProps {
    monthlyInvestment: number;
    annualReturn: number;
    years: number;
    investedAmount: number;
    estimatedReturns: number;
    maturityValue: number;
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);
}

export default function DownloadReport({
    monthlyInvestment,
    annualReturn,
    years,
    investedAmount,
    estimatedReturns,
    maturityValue,
}: DownloadReportProps) {

    const generatePDF = () => {

        const pdf = new jsPDF();

        pdf.setFontSize(22);
        pdf.text("Luxmi InvestCare", 20, 20);

        pdf.setFontSize(13);
        pdf.text("SIP Projection Report", 20, 30);

        pdf.line(20, 35, 190, 35);

        pdf.setFontSize(12);

        pdf.text(`Monthly SIP : ${formatCurrency(monthlyInvestment)}`, 20, 50);

        pdf.text(`Expected Return : ${annualReturn}%`, 20, 60);

        pdf.text(`Investment Period : ${years} Years`, 20, 70);

        pdf.line(20, 78, 190, 78);

        pdf.setFontSize(14);

        pdf.text("Projection Summary", 20, 92);

        pdf.setFontSize(12);

        pdf.text(
            `Total Investment : ${formatCurrency(investedAmount)}`,
            20,
            105
        );

        pdf.text(
            `Estimated Returns : ${formatCurrency(estimatedReturns)}`,
            20,
            115
        );

        pdf.text(
            `Estimated Maturity Value : ${formatCurrency(maturityValue)}`,
            20,
            125
        );

        pdf.line(20, 135, 190, 135);

        pdf.setFontSize(10);

        pdf.text(
            "This report is generated for investor education purposes only.",
            20,
            150
        );

        pdf.text(
            "Mutual Fund investments are subject to market risks.",
            20,
            158
        );

        pdf.text(
            "Please read all scheme related documents carefully before investing.",
            20,
            166
        );

        pdf.text(
            "Luxmi InvestCare | AMFI Registered Mutual Fund Distributor | ARN-365140",
            20,
            185
        );

        pdf.save("Luxmi-InvestCare-SIP-Report.pdf");
    };

    return (
        <Button
            onClick={generatePDF}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800"
        >
            <Download className="h-5 w-5" />
            Download PDF Report
        </Button>
    );
}