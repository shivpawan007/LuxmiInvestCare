import { NextResponse } from "next/server";
import type {
    ResultSetHeader,
    RowDataPacket,
} from "mysql2";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const allowedActivities = [
    "NOTE_ADDED",
    "CALL_ATTEMPTED",
    "WHATSAPP_OPENED",
    "EMAIL_OPENED",
    "FOLLOW_UP_SET",
];

export async function POST(
    request: Request,
    context: {
        params: Promise<{ id: string }>;
    },
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const { id: rawId } = await context.params;
        const leadId = Number(rawId);

        if (
            !Number.isInteger(leadId) ||
            leadId <= 0
        ) {
            return NextResponse.json(
                { error: "Invalid lead ID." },
                { status: 400 },
            );
        }

        const body = await request.json();

        const type = body?.type;
        const note =
            typeof body?.note === "string"
                ? body.note.trim()
                : "";

        if (
            typeof type !== "string" ||
            !allowedActivities.includes(type)
        ) {
            return NextResponse.json(
                {
                    error:
                        "Invalid activity type.",
                },
                { status: 400 },
            );
        }

        if (type === "NOTE_ADDED" && !note) {
            return NextResponse.json(
                {
                    error:
                        "Note cannot be empty.",
                },
                { status: 400 },
            );
        }

        interface LeadAccessRow extends RowDataPacket {
    id: number;
    assigned_user_id: number | null;
}

const [leadRows] =
    await db.execute<LeadAccessRow[]>(
        `
        SELECT
            id,
            assigned_user_id
        FROM leads
        WHERE id = ?
        ${
            user.roleKey === "STAFF"
                ? "AND assigned_user_id = ?"
                : ""
        }
        LIMIT 1
        `,
        user.roleKey === "STAFF"
            ? [leadId, user.id]
            : [leadId],
    );

if (!leadRows[0]) {
            return NextResponse.json(
                { error: "Lead not found." },
                { status: 404 },
            );
        }

        let activityNote = note;

        if (!activityNote) {
            const labels: Record<
                string,
                string
            > = {
                CALL_ATTEMPTED:
                    "Call attempt initiated.",
                WHATSAPP_OPENED:
                    "WhatsApp conversation opened.",
                EMAIL_OPENED:
                    "Email action initiated.",
                FOLLOW_UP_SET:
                    "Follow-up action recorded.",
            };

            activityNote =
                labels[type] ||
                type;
        }

        const [result] =
            await db.execute<ResultSetHeader>(
                `
                INSERT INTO lead_activities
                    (
                        lead_id,
                        user_id,
                        activity_type,
                        activity_note
                    )
                VALUES
                    (?, ?, ?, ?)
                `,
                [
                    leadId,
                    user.id,
                    type,
                    activityNote,
                ],
            );

        return NextResponse.json({
            success: true,
            activityId: result.insertId,
        });
    } catch (error) {
        console.error(
            "LEAD_ACTIVITY_POST_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to record activity.",
            },
            { status: 500 },
        );
    }
}