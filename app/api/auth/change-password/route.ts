import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type {
    ResultSetHeader,
    RowDataPacket,
} from "mysql2";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface PasswordRow extends RowDataPacket {
    passwordHash: string;
}

export async function POST(
    request: Request,
) {
    try {
        const user =
            await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    error:
                        "Unauthorized.",
                },
                {
                    status: 401,
                },
            );
        }

        const body =
            await request.json();

        const currentPassword =
            typeof body?.currentPassword ===
            "string"
                ? body.currentPassword
                : "";

        const newPassword =
            typeof body?.newPassword ===
            "string"
                ? body.newPassword
                : "";

        const confirmPassword =
            typeof body?.confirmPassword ===
            "string"
                ? body.confirmPassword
                : "";

        if (!currentPassword) {
            return NextResponse.json(
                {
                    error:
                        "Current password is required.",
                },
                {
                    status: 400,
                },
            );
        }

        if (!newPassword) {
            return NextResponse.json(
                {
                    error:
                        "New password is required.",
                },
                {
                    status: 400,
                },
            );
        }

        if (
            newPassword.length < 8
        ) {
            return NextResponse.json(
                {
                    error:
                        "New password must contain at least 8 characters.",
                },
                {
                    status: 400,
                },
            );
        }

        if (
            newPassword !==
            confirmPassword
        ) {
            return NextResponse.json(
                {
                    error:
                        "New password and confirmation do not match.",
                },
                {
                    status: 400,
                },
            );
        }

        if (
            currentPassword ===
            newPassword
        ) {
            return NextResponse.json(
                {
                    error:
                        "New password must be different from the current password.",
                },
                {
                    status: 400,
                },
            );
        }

        const [rows] =
            await db.execute<
                PasswordRow[]
            >(
                `
                SELECT
                    password_hash AS passwordHash
                FROM users
                WHERE id = ?
                  AND is_active = 1
                LIMIT 1
                `,
                [user.id],
            );

        const account =
            rows[0];

        if (!account) {
            return NextResponse.json(
                {
                    error:
                        "Active user account was not found.",
                },
                {
                    status: 404,
                },
            );
        }

        const passwordMatches =
            await bcrypt.compare(
                currentPassword,
                account.passwordHash,
            );

        if (!passwordMatches) {
            return NextResponse.json(
                {
                    error:
                        "Current password is incorrect.",
                },
                {
                    status: 400,
                },
            );
        }

        const passwordHash =
            await bcrypt.hash(
                newPassword,
                12,
            );

        const [result] =
            await db.execute<
                ResultSetHeader
            >(
                `
                UPDATE users
                SET
                    password_hash = ?,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
                `,
                [
                    passwordHash,
                    user.id,
                ],
            );

        if (
            result.affectedRows !==
            1
        ) {
            return NextResponse.json(
                {
                    error:
                        "Password could not be updated.",
                },
                {
                    status: 500,
                },
            );
        }

        return NextResponse.json({
            success: true,
            message:
                "Password changed successfully.",
        });
    } catch (error) {
        console.error(
            "CHANGE_PASSWORD_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to change password.",
            },
            {
                status: 500,
            },
        );
    }
}