import mysql from "mysql2/promise";

declare global {
    // eslint-disable-next-line no-var
    var __luxmiDbPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
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

function getPool(): mysql.Pool {
    return (
        global.__luxmiDbPool ||
        (global.__luxmiDbPool = createPool())
    );
}

/**
 * Lazy database pool.
 *
 * Importing this module does not require database environment variables.
 * The pool is created only when a database method is actually used.
 */
export const db = new Proxy({} as mysql.Pool, {
    get(_target, property) {
        const pool = getPool();
        const value = Reflect.get(pool, property, pool);

        if (typeof value === "function") {
            return value.bind(pool);
        }

        return value;
    },
});
