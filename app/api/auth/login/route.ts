import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";

interface UserRow extends RowDataPacket {
    id: number;
    password_hash: string;
}

const schema = z.object({
    email: z.string().email().max(190),
    password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Invalid email or password.",
                },
                { status: 400 },
            );
        }

        const { email, password } = parsed.data;

        const [rows] = await db.execute<UserRow[]>(
            `
            SELECT
                u.id,
                u.password_hash
            FROM users u
            WHERE LOWER(u.email) = LOWER(?)
              AND u.is_active = 1
            LIMIT 1
            `,
            [email],
        );

        const user = rows[0];

if (!user) {
    return NextResponse.json(
        {
            error: "Invalid email or password.",
        },
        { status: 401 },
    );
}

        const valid = await bcrypt.compare(
            password,
            user.password_hash,
        );

        if (!valid) {
            return NextResponse.json(
                {
                    error: "Invalid email or password.",
                },
                { status: 401 },
            );
        }

        await db.execute(
            `
            UPDATE users
            SET last_login_at = UTC_TIMESTAMP()
            WHERE id = ?
            `,
            [user.id],
        );

        await createSession(Number(user.id));

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("LOGIN_ERROR", error);

        return NextResponse.json(
            {
                error: "Unable to sign in.",
            },
            { status: 500 },
        );
    }
}