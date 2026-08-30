import mysql from "mysql2/promise";

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
} = process.env;

if (!DB_HOST || !DB_NAME || !DB_USER) {
    throw new Error(
        "Database environment variables are missing.",
    );
}

const connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT || 3306),
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
});

const [databaseRows] = await connection.query(
    "SELECT DATABASE() AS database_name",
);

const [tableRows] = await connection.query(
    "SHOW TABLES",
);

console.log("\nDatabase connection successful.");
console.log(databaseRows);

console.log("\nTables:");
console.table(tableRows);

await connection.end();