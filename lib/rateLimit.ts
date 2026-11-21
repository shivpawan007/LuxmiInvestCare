import { createHmac } from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

interface RateLimitRow extends RowDataPacket {
    hits: number;
}

declare global {
    // eslint-disable-next-line no-var
    var __luxmiRateLimitLastCleanupAt: number | undefined;
}

export interface RateLimitResult {
    allowed: boolean;
    retryAfterSeconds: number;
    remaining: number;
}

/** Uses an atomic MySQL upsert so limits are shared across serverless instances. */
export async function enforceRateLimit(
    request: Request,
    bucket: string,
    maxRequests: number,
    windowSeconds: number,
): Promise<RateLimitResult> {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error("AUTH_SECRET must be configured for rate limiting.");
    }

    const ip = request.headers.get("x-real-ip")?.trim()
        || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || "unknown";
    const keyHash = createHmac("sha256", secret)
        .update(bucket + ":" + ip)
        .digest("hex");

    const now = Date.now();
    const epochSeconds = Math.floor(now / 1000);
    const windowStartEpoch = Math.floor(epochSeconds / windowSeconds) * windowSeconds;
    const windowStart = new Date(windowStartEpoch * 1000)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

    await db.execute(
        \`INSERT INTO api_rate_limits (bucket, key_hash, window_start, hits)
         VALUES (?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE hits = hits + 1\`,
        [bucket, keyHash, windowStart],
    );

    const [rows] = await db.execute<RateLimitRow[]>(
        \`SELECT hits FROM api_rate_limits
         WHERE bucket = ? AND key_hash = ? AND window_start = ?
         LIMIT 1\`,
        [bucket, keyHash, windowStart],
    );
    const hits = Number(rows[0]?.hits ?? 0);

    // Cleanup is best-effort and limited to once per warm instance/hour.
    if (!global.__luxmiRateLimitLastCleanupAt
        || now - global.__luxmiRateLimitLastCleanupAt > 60 * 60 * 1000) {
        global.__luxmiRateLimitLastCleanupAt = now;
        void db.execute(
            "DELETE FROM api_rate_limits WHERE window_start < UTC_TIMESTAMP() - INTERVAL 2 DAY",
        ).catch((error) => {
            console.warn("RATE_LIMIT_CLEANUP_ERROR", error);
        });
    }

    const secondsIntoWindow = epochSeconds % windowSeconds;
    return {
        allowed: hits <= maxRequests,
        retryAfterSeconds: Math.max(1, windowSeconds - secondsIntoWindow),
        remaining: Math.max(0, maxRequests - hits),
    };
}
