import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        let query = `
            SELECT
                l.id,
                l.full_name AS fullName,
                l.mobile,
                l.email,
                l.enquiry,
                l.lead_source AS leadSource,
                l.status,
                l.priority,
                l.assigned_user_id AS assignedUserId,
                au.full_name AS assignedUserName,
                l.last_contacted_at AS lastContactedAt,
                l.created_at AS createdAt
            FROM leads l
            LEFT JOIN users au
                ON au.id = l.assigned_user_id
        `;

        const params: number[] = [];

        if (user.roleKey === "STAFF") {
            query += `
                WHERE l.assigned_user_id = ?
            `;
            params.push(user.id);
        }

        query += `
            ORDER BY l.created_at DESC
        `;

        const [rows] = await db.execute(
            query,
            params,
        );

        return NextResponse.json({
            success: true,
            userRole: user.roleKey,
            leads: rows,
        });
    } catch (error) {
        console.error("LEAD_LIST_ERROR", error);

        return NextResponse.json(
            { error: "Unable to load leads." },
            { status: 500 },
        );
    }
}