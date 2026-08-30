import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
} = process.env;

if (
    !DB_HOST ||
    !DB_NAME ||
    !DB_USER ||
    !ADMIN_EMAIL ||
    !ADMIN_PASSWORD
) {
    throw new Error(
        "Missing database or admin environment variables.",
    );
}

const connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
});

const [roleRows] = await connection.execute(
    `SELECT id FROM roles WHERE role_key = 'ADMIN' LIMIT 1`,
);

const adminRoleId = roleRows[0]?.id;

if (!adminRoleId) {
    throw new Error("ADMIN role not found.");
}

const passwordHash = await bcrypt.hash(
    ADMIN_PASSWORD,
    12,
);

await connection.execute(
    `
    INSERT INTO users
        (role_id, full_name, email, password_hash, is_active)
    VALUES
        (?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        role_id = VALUES(role_id),
        password_hash = VALUES(password_hash),
        is_active = 1
    `,
    [
        adminRoleId,
        ADMIN_NAME || "Luxmi InvestCare Administrator",
        ADMIN_EMAIL,
        passwordHash,
    ],
);

console.log(`Administrator created/updated: ${ADMIN_EMAIL}`);

await connection.end();