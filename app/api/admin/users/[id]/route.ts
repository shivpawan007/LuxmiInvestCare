import { NextResponse } from "next/server";
import type {
    ResultSetHeader,
    RowDataPacket,
} from "mysql2";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface UserAccessRow extends RowDataPacket {
    id: number;
    roleKey: string;
    isActive: number;
}

export async function PATCH(
    request: Request,
    context: {
        params: Promise<{ id: string }>;
    },
) {
    try {
        const currentUser =
            await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        if (
            currentUser.roleKey !==
            "ADMIN"
        ) {
            return NextResponse.json(
                {
                    error:
                        "Only administrators can modify users.",
                },
                { status: 403 },
            );
        }

        const { id: rawId } =
            await context.params;

        const userId = Number(rawId);

        if (
            !Number.isInteger(userId) ||
            userId <= 0
        ) {
            return NextResponse.json(
                {
                    error:
                        "Invalid user ID.",
                },
                { status: 400 },
            );
        }

        if (
            userId === currentUser.id
        ) {
            return NextResponse.json(
                {
                    error:
                        "You cannot deactivate your own account.",
                },
                { status: 400 },
            );
        }

        const body = await request.json();

        if (
            typeof body?.isActive !==
            "boolean"
        ) {
            return NextResponse.json(
                {
                    error:
                        "isActive must be true or false.",
                },
                { status: 400 },
            );
        }

        const [existingRows] =
            await db.execute<
                UserAccessRow[]
            >(
                `
                SELECT
                    u.id,
                    r.role_key AS roleKey,
                    u.is_active AS isActive
                FROM users u
                INNER JOIN roles r
                    ON r.id = u.role_id
                WHERE u.id = ?
                LIMIT 1
                `,
                [userId],
            );

        const existing =
            existingRows[0];

        if (!existing) {
            return NextResponse.json(
                {
                    error:
                        "User not found.",
                },
                { status: 404 },
            );
        }

        const [result] =
            await db.execute<ResultSetHeader>(
                `
                UPDATE users
                SET is_active = ?
                WHERE id = ?
                `,
                [
                    body.isActive ? 1 : 0,
                    userId,
                ],
            );

        if (
            result.affectedRows !==
            1
        ) {
            return NextResponse.json(
                {
                    error:
                        "User status was not updated.",
                },
                { status: 500 },
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(
            "ADMIN_USER_PATCH_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to update user.",
            },
            { status: 500 },
        );
    }
}