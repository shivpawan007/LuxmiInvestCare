import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "luxmi_session";
const SESSION_DAYS = 7;

type SessionPayload = {
    userId: number;
};

function getSecret() {
    const secret = process.env.AUTH_SECRET;

    if (!secret) {
        throw new Error("AUTH_SECRET is not configured.");
    }

    return new TextEncoder().encode(secret);
}

export async function createSession(userId: number) {
    const token = await new SignJWT({
        userId,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DAYS}d`)
        .sign(getSecret());

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_DAYS * 24 * 60 * 60,
    });
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            getSecret(),
        );

        if (
            typeof payload.userId !== "number" &&
            typeof payload.userId !== "string"
        ) {
            return null;
        }

        return {
            userId: Number(payload.userId),
        };
    } catch {
        return null;
    }
}

export async function clearSession() {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
}