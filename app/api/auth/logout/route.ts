import { NextResponse } from "next/server";

import { clearSession } from "@/lib/session";

export async function POST() {
    try {
        await clearSession();

        return NextResponse.json(
            {
                success: true,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error(
            "LOGOUT_ERROR",
            error,
        );

        return NextResponse.json(
            {
                error:
                    "Unable to log out.",
            },
            {
                status: 500,
            },
        );
    }
}