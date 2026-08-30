import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type {
    ResultSetHeader,
    RowDataPacket,
} from "mysql2";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface UserRow extends RowDataPacket {
    id: number;
    fullName: string;
    email: string;
    mobile: string | null;
    roleKey: string;
    roleName: string;
    isActive: number;
    createdAt: string;
    lastLoginAt: string | null;
}

interface RoleRow extends RowDataPacket {
    id: number;
    roleKey: string;
    roleName: string;
}

const allowedRoles = [
    "ADMIN",
    "MANAGER",
    "STAFF",
] as const;

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        if (
            user.roleKey !== "ADMIN" &&
            user.roleKey !== "MANAGER"
        ) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 },
            );
        }

        const [users] =
            await db.execute<UserRow[]>(
                `
                SELECT
                    u.id,
                    u.full_name AS fullName,
                    u.email,
                    u.mobile,
                    r.role_key AS roleKey,
                    r.role_name AS roleName,
                    u.is_active AS isActive,
                    u.created_at AS createdAt,
                    u.last_login_at AS lastLoginAt
                FROM users u
                INNER JOIN roles r
                    ON r.id = u.role_id
                ORDER BY u.created_at DESC
                `,
            );

        const [roles] =
            await db.execute<RoleRow[]>(
                `
                SELECT
                    id,
                    role_key AS roleKey,
                    role_name AS roleName
                FROM roles
                WHERE role_key IN (
                    'ADMIN',
                    'MANAGER',
                    'STAFF'
                )
                ORDER BY
                    CASE role_key
                        WHEN 'ADMIN' THEN 1
                        WHEN 'MANAGER' THEN 2
                        WHEN 'STAFF' THEN 3
                        ELSE 4
                    END
                `,
            );

        return NextResponse.json({
            success: true,
            users,
            roles,
        });
    } catch (error) {
        console.error(
            "ADMIN_USERS_GET_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to load users.",
            },
            { status: 500 },
        );
    }
}

export async function POST(
    request: Request,
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
                        "Only administrators can create users.",
                },
                { status: 403 },
            );
        }

        const body = await request.json();

        const fullName =
            typeof body?.fullName === "string"
                ? body.fullName.trim()
                : "";

        const email =
            typeof body?.email === "string"
                ? body.email
                      .trim()
                      .toLowerCase()
                : "";

        const mobile =
            typeof body?.mobile === "string"
                ? body.mobile
                      .replace(/\D/g, "")
                      .trim()
                : "";

        const password =
            typeof body?.password === "string"
                ? body.password
                : "";

        const roleKey =
            typeof body?.roleKey === "string"
                ? body.roleKey
                      .trim()
                      .toUpperCase()
                : "";

        if (!fullName) {
            return NextResponse.json(
                {
                    error:
                        "Full name is required.",
                },
                { status: 400 },
            );
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email,
            )
        ) {
            return NextResponse.json(
                {
                    error:
                        "A valid email address is required.",
                },
                { status: 400 },
            );
        }

        if (
            mobile &&
            mobile.length !== 10
        ) {
            return NextResponse.json(
                {
                    error:
                        "Mobile number must contain 10 digits.",
                },
                { status: 400 },
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                {
                    error:
                        "Password must contain at least 8 characters.",
                },
                { status: 400 },
            );
        }

        if (
            !allowedRoles.includes(
                roleKey as (
                    typeof allowedRoles
                )[number],
            )
        ) {
            return NextResponse.json(
                {
                    error:
                        "Invalid user role.",
                },
                { status: 400 },
            );
        }

        const [existingUsers] =
            await db.execute<UserRow[]>(
                `
                SELECT
                    u.id,
                    u.full_name AS fullName,
                    u.email,
                    u.mobile,
                    r.role_key AS roleKey,
                    r.role_name AS roleName,
                    u.is_active AS isActive,
                    u.created_at AS createdAt,
                    u.last_login_at AS lastLoginAt
                FROM users u
                INNER JOIN roles r
                    ON r.id = u.role_id
                WHERE u.email = ?
                LIMIT 1
                `,
                [email],
            );

        if (existingUsers[0]) {
            return NextResponse.json(
                {
                    error:
                        "A user with this email already exists.",
                },
                { status: 409 },
            );
        }

        const [roleRows] =
            await db.execute<RoleRow[]>(
                `
                SELECT
                    id,
                    role_key AS roleKey,
                    role_name AS roleName
                FROM roles
                WHERE role_key = ?
                LIMIT 1
                `,
                [roleKey],
            );

        const role = roleRows[0];

        if (!role) {
            return NextResponse.json(
                {
                    error:
                        "Selected role does not exist.",
                },
                { status: 400 },
            );
        }

        const passwordHash =
            await bcrypt.hash(
                password,
                12,
            );

        const [result] =
            await db.execute<ResultSetHeader>(
                `
                INSERT INTO users
                    (
                        role_id,
                        full_name,
                        email,
                        mobile,
                        password_hash,
                        is_active
                    )
                VALUES
                    (?, ?, ?, ?, ?, 1)
                `,
                [
                    role.id,
                    fullName,
                    email,
                    mobile || null,
                    passwordHash,
                ],
            );

        return NextResponse.json(
            {
                success: true,
                userId: result.insertId,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error(
            "ADMIN_USERS_POST_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to create user.",
            },
            { status: 500 },
        );
    }
}