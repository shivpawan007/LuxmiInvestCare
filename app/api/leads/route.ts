import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
    fullName: z.string().trim().min(2).max(150),
    mobile: z
        .string()
        .transform((value) => value.replace(/\D/g, ""))
        .refine(
            (value) => value.length === 10,
            "Invalid mobile number",
        ),
    email: z
        .string()
        .trim()
        .max(190)
        .optional()
        .or(z.literal("")),
    enquiry: z.string().trim().min(2).max(5000),
    source: z.string().trim().max(80).optional(),
    landingPage: z.string().trim().max(500).optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const parsed = leadSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Please check the information entered.",
                },
                { status: 400 },
            );
        }

        const data = parsed.data;

const [result] = await db.execute<ResultSetHeader>(
            `
            INSERT INTO leads
                (
                    full_name,
                    mobile,
                    email,
                    enquiry,
                    lead_source,
                    landing_page,
                    status,
                    priority
                )
            VALUES
                (?, ?, ?, ?, ?, ?, 'New', 'Normal')
            `,
            [
                data.fullName,
                data.mobile,
                data.email || null,
                data.enquiry,
                data.source || "website",
                data.landingPage || null,
            ],
        );

        const leadId = result.insertId;

        await db.execute(
            `
            INSERT INTO lead_activities
                (lead_id, activity_type, activity_note)
            VALUES
                (?, 'LEAD_CREATED', 'Lead submitted from website')
            `,
            [leadId],
        );

        return NextResponse.json({
            success: true,
            leadId,
        });
    } catch (error) {
        console.error("LEAD_CREATE_ERROR", error);

        return NextResponse.json(
            {
                error: "Unable to save your enquiry.",
            },
            { status: 500 },
        );
    }
}