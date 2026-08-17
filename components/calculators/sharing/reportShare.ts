export type CalculatorType =
    | "sip"
    | "lumpsum"
    | "step-up-sip"
    | "swp"
    | "goal-planner"
    | "retirement"
    | "child-education";

export type ReportShareAction =
    | "generated"
    | "downloaded"
    | "whatsapp"
    | "email"
    | "qr"
    | "call"
    | "website";

export interface ReportShareRecord {
    id: string;
    calculatorType: CalculatorType;
    reportTitle: string;

    customerName?: string;
    mobile?: string;
    email?: string;

    investment: number;
    years: number;
    annualReturn: number;
    estimatedReturns: number;
    maturityValue: number;

    action: ReportShareAction;
    timestamp: string;
}

const STORAGE_KEY = "luxmi-investcare-report-share-history";

export function recordReportShare(
    record: Omit<ReportShareRecord, "id" | "timestamp">
) {
    if (typeof window === "undefined") return;

    const existing: ReportShareRecord[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const newRecord: ReportShareRecord = {
        ...record,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
    };

    existing.push(newRecord);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(existing)
    );

    return newRecord;
}

export function getReportShareHistory(): ReportShareRecord[] {
    if (typeof window === "undefined") return [];

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
    );
}