import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export type CurrentUser = {
    id: number;
    fullName: string;
    email: string;
    mobile: string | null;
    roleKey: string;
    roleName: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
    const session = await getSession();

    if (!session) {
        return null;
    }

    const [rows] = await db.execute(
        `
        SELECT
            u.id,
            u.full_name AS fullName,
            u.email,
            u.mobile,
            r.role_key AS roleKey,
            r.role_name AS roleName
        FROM users u
        INNER JOIN roles r ON r.id = u.role_id
        WHERE u.id = ?
          AND u.is_active = 1
        LIMIT 1
        `,
        [session.userId],
    );

    const user = (rows as CurrentUser[])[0];

    return user || null;
}

export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/admin/login");
    }

    return user;
}

export async function requireRole(
    allowedRoles: string[],
) {
    const user = await requireUser();

    if (!allowedRoles.includes(user.roleKey)) {
        redirect("/admin/dashboard");
    }

    return user;
}