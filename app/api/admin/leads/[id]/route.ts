import { NextResponse } from "next/server";
import type {
    ResultSetHeader,
    RowDataPacket,
} from "mysql2";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface LeadRow extends RowDataPacket {
    id: number;
    fullName: string;
    mobile: string;
    email: string | null;
    enquiry: string | null;
    leadSource: string;
    landingPage: string | null;
    status: string;
    priority: string;
    assignedUserId: number | null;
    assignedUserName: string | null;
    assignedUserEmail: string | null;
    lastContactedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

interface ActivityRow extends RowDataPacket {
    id: number;
    activityType: string;
    activityNote: string | null;
    userName: string | null;
    createdAt: string;
}

interface AssignedUserRow extends RowDataPacket {
    id: number;
    fullName: string;
    email: string;
    roleKey: string;
}

const allowedStatuses = [
    "New",
    "Contacted",
    "Follow-up",
    "Converted",
    "Closed",
    "Lost",
];

const allowedPriorities = [
    "Low",
    "Normal",
    "High",
    "Urgent",
];

function parseLeadId(value: string) {
    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
        return null;
    }

    return id;
}

export async function GET(
    _request: Request,
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
        const leadId = parseLeadId(rawId);

        if (!leadId) {
            return NextResponse.json(
                { error: "Invalid lead ID." },
                { status: 400 },
            );
        }

        let leadQuery = `
            SELECT
                l.id,
                l.full_name AS fullName,
                l.mobile,
                l.email,
                l.enquiry,
                l.lead_source AS leadSource,
                l.landing_page AS landingPage,
                l.status,
                l.priority,
                l.assigned_user_id AS assignedUserId,
                au.full_name AS assignedUserName,
                au.email AS assignedUserEmail,
                l.last_contacted_at AS lastContactedAt,
                l.created_at AS createdAt,
                l.updated_at AS updatedAt
            FROM leads l
            LEFT JOIN users au
                ON au.id = l.assigned_user_id
            WHERE l.id = ?
        `;

        const leadParams: number[] = [leadId];

        if (user.roleKey === "STAFF") {
            leadQuery += `
                AND l.assigned_user_id = ?
            `;

            leadParams.push(user.id);
        }

        leadQuery += ` LIMIT 1`;

        const [leadRows] =
            await db.execute<LeadRow[]>(
                leadQuery,
                leadParams,
            );

        const lead = leadRows[0];

        if (!lead) {
            return NextResponse.json(
                { error: "Lead not found." },
                { status: 404 },
            );
        }

        const [activityRows] =
            await db.execute<ActivityRow[]>(
                `
                SELECT
                    a.id,
                    a.activity_type AS activityType,
                    a.activity_note AS activityNote,
                    u.full_name AS userName,
                    a.created_at AS createdAt
                FROM lead_activities a
                LEFT JOIN users u
                    ON u.id = a.user_id
                WHERE a.lead_id = ?
                ORDER BY a.created_at DESC, a.id DESC
                `,
                [leadId],
            );

        let staffUsers: AssignedUserRow[] = [];

        if (
            user.roleKey === "ADMIN" ||
            user.roleKey === "MANAGER"
        ) {
            const [userRows] =
                await db.execute<
                    AssignedUserRow[]
                >(
                    `
                    SELECT
                        u.id,
                        u.full_name AS fullName,
                        u.email,
                        r.role_key AS roleKey
                    FROM users u
                    INNER JOIN roles r
                        ON r.id = u.role_id
                    WHERE u.is_active = 1
                      AND r.role_key IN ('STAFF', 'MANAGER')
                    ORDER BY u.full_name ASC
                    `,
                );

            staffUsers = userRows;
        }

        return NextResponse.json({
            success: true,
            currentUserRole: user.roleKey,
            lead,
            activities: activityRows,
            assignableUsers: staffUsers,
        });
    } catch (error) {
        console.error(
            "LEAD_DETAIL_GET_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error: "Unable to load lead.",
            },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: Request,
    context: {
        params: Promise<{ id: string }>;
    },
) {
    const connection = await db.getConnection();

    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const { id: rawId } = await context.params;
        const leadId = parseLeadId(rawId);

        if (!leadId) {
            return NextResponse.json(
                { error: "Invalid lead ID." },
                { status: 400 },
            );
        }

        const body = await request.json();

        const {
            status,
            priority,
            assignedUserId,
        } = body as {
            status?: unknown;
            priority?: unknown;
            assignedUserId?: unknown;
        };

        if (
            status !== undefined &&
            (
                typeof status !== "string" ||
                !allowedStatuses.includes(status)
            )
        ) {
            return NextResponse.json(
                { error: "Invalid status." },
                { status: 400 },
            );
        }

        if (
            priority !== undefined &&
            (
                typeof priority !== "string" ||
                !allowedPriorities.includes(priority)
            )
        ) {
            return NextResponse.json(
                { error: "Invalid priority." },
                { status: 400 },
            );
        }

        if (
            assignedUserId !== undefined &&
            assignedUserId !== null &&
            (
                typeof assignedUserId !== "number" ||
                !Number.isInteger(assignedUserId)
            )
        ) {
            return NextResponse.json(
                { error: "Invalid assigned user." },
                { status: 400 },
            );
        }

        if (
            assignedUserId !== undefined &&
            user.roleKey !== "ADMIN" &&
            user.roleKey !== "MANAGER"
        ) {
            return NextResponse.json(
                {
                    error:
                        "Only administrators and managers can assign leads.",
                },
                { status: 403 },
            );
        }

        const [existingRows] =
            await connection.execute<LeadRow[]>(
                `
                SELECT
                    l.id,
                    l.full_name AS fullName,
                    l.status,
                    l.priority,
                    l.assigned_user_id AS assignedUserId
                FROM leads l
                WHERE l.id = ?
                ${
                    user.roleKey === "STAFF"
                        ? "AND l.assigned_user_id = ?"
                        : ""
                }
                LIMIT 1
                `,
                user.roleKey === "STAFF"
                    ? [leadId, user.id]
                    : [leadId],
            );

        const existing = existingRows[0];

        if (!existing) {
            return NextResponse.json(
                { error: "Lead not found." },
                { status: 404 },
            );
        }

        let nextAssignedUserId =
            existing.assignedUserId;

        if (assignedUserId !== undefined) {
            nextAssignedUserId =
                assignedUserId;
        }

        if (
            assignedUserId !== undefined &&
            assignedUserId !== null
        ) {
            const [targetRows] =
                await connection.execute<
                    AssignedUserRow[]
                >(
                    `
                    SELECT
                        u.id,
                        u.full_name AS fullName,
                        u.email,
                        r.role_key AS roleKey
                    FROM users u
                    INNER JOIN roles r
                        ON r.id = u.role_id
                    WHERE u.id = ?
                      AND u.is_active = 1
                      AND r.role_key IN ('STAFF', 'MANAGER')
                    LIMIT 1
                    `,
                    [assignedUserId],
                );

            if (!targetRows[0]) {
                return NextResponse.json(
                    {
                        error:
                            "Selected user is not an active staff or manager.",
                    },
                    { status: 400 },
                );
            }
        }

        const nextStatus =
            status ?? existing.status;

        const nextPriority =
            priority ?? existing.priority;

        await connection.beginTransaction();

        const [updateResult] =
            await connection.execute<ResultSetHeader>(
                `
                UPDATE leads
                SET
                    status = ?,
                    priority = ?,
                    assigned_user_id = ?
                WHERE id = ?
                `,
                [
                    nextStatus,
                    nextPriority,
                    nextAssignedUserId,
                    leadId,
                ],
            );

        if (updateResult.affectedRows !== 1) {
            throw new Error(
                "Lead update failed.",
            );
        }

        if (
            status !== undefined &&
            status !== existing.status
        ) {
            await connection.execute<ResultSetHeader>(
                `
                INSERT INTO lead_activities
                    (
                        lead_id,
                        user_id,
                        activity_type,
                        activity_note
                    )
                VALUES
                    (?, ?, 'STATUS_CHANGED', ?)
                `,
                [
                    leadId,
                    user.id,
                    `Status changed from ${existing.status} to ${status}.`,
                ],
            );
        }

        if (
            priority !== undefined &&
            priority !== existing.priority
        ) {
            await connection.execute<ResultSetHeader>(
                `
                INSERT INTO lead_activities
                    (
                        lead_id,
                        user_id,
                        activity_type,
                        activity_note
                    )
                VALUES
                    (?, ?, 'PRIORITY_CHANGED', ?)
                `,
                [
                    leadId,
                    user.id,
                    `Priority changed from ${existing.priority} to ${priority}.`,
                ],
            );
        }

        if (
            assignedUserId !== undefined &&
            assignedUserId !==
                existing.assignedUserId
        ) {
            await connection.execute<ResultSetHeader>(
                `
                INSERT INTO lead_assignments
                    (
                        lead_id,
                        assigned_to,
                        assigned_by,
                        reason
                    )
                VALUES
                    (?, ?, ?, 'CRM assignment')
                `,
                [
                    leadId,
                    nextAssignedUserId,
                    user.id,
                ],
            );

            let assignmentNote =
                "Lead unassigned.";

            if (nextAssignedUserId !== null) {
                assignmentNote =
                    `Lead assigned to user #${nextAssignedUserId}.`;
            }

            await connection.execute<ResultSetHeader>(
                `
                INSERT INTO lead_activities
                    (
                        lead_id,
                        user_id,
                        activity_type,
                        activity_note
                    )
                VALUES
                    (?, ?, 'LEAD_ASSIGNED', ?)
                `,
                [
                    leadId,
                    user.id,
                    assignmentNote,
                ],
            );
        }

        await connection.commit();

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        await connection.rollback();

        console.error(
            "LEAD_DETAIL_PATCH_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to update the lead.",
            },
            { status: 500 },
        );
    } finally {
        connection.release();
    }
}