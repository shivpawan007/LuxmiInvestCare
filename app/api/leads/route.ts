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
    privacyConsent: z.literal(true),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const parsed = leadSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Please check the information entered and accept the Privacy Policy.",
                },
                { status: 400 },
            );
        }

        const data = parsed.data;
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [result] = await connection.execute<ResultSetHeader>(
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

            await connection.execute(
                `
                INSERT INTO lead_activities
                    (lead_id, activity_type, activity_note)
                VALUES
                    (?, 'LEAD_CREATED', 'Lead submitted from website')
                `,
                [leadId],
            );

            await connection.execute(
                `
                INSERT INTO consents
                    (
                        lead_id,
                        purpose,
                        notice_version,
                        consent_status,
                        source,
                        given_at
                    )
                VALUES
                    (?, 'website-enquiry', 'Privacy Notice v1.0 | 23 September 2026', 'Granted', ?, CURRENT_TIMESTAMP)
                `,
                [leadId, data.source || "website"],
            );

            await connection.commit();

            return NextResponse.json({
                success: true,
                leadId,
            });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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
