import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    try {
        const user =
            await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                {
                    user: null,
                },
                {
                    status: 401,
                },
            );
        }

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    fullName:
                        user.fullName,
                    email: user.email,
                    mobile:
                        user.mobile,
                    roleKey:
                        user.roleKey,
                    roleName:
                        user.roleName,
                },
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error(
            "AUTH_ME_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to load current user.",
            },
            {
                status: 500,
            },
        );
    }
}