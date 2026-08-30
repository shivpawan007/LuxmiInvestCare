import mysql from "mysql2/promise";

declare global {
    // eslint-disable-next-line no-var
    var __luxmiDbPool: mysql.Pool | undefined;
}

function createPool() {
    const {
        DB_HOST,
        DB_PORT,
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
    } = process.env;

    if (!DB_HOST || !DB_NAME || !DB_USER) {
        throw new Error(
            "Database environment variables are not configured.",
        );
    }

    return mysql.createPool({
        host: DB_HOST,
        port: Number(DB_PORT || 3306),
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
        charset: "utf8mb4",
        timezone: "Z",
    });
}

export const db =
    global.__luxmiDbPool ||
    (global.__luxmiDbPool = createPool());