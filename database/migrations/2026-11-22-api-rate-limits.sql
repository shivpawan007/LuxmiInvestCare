-- Persistent, privacy-preserving fixed-window rate limits for public API endpoints.
-- The key is an HMAC of the client IP; raw IP addresses are not stored.
CREATE TABLE IF NOT EXISTS api_rate_limits (
    bucket VARCHAR(40) NOT NULL,
    key_hash CHAR(64) NOT NULL,
    window_start DATETIME NOT NULL,
    hits INT UNSIGNED NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (bucket, key_hash, window_start),
    KEY idx_api_rate_limits_window_start (window_start)
) ENGINE=InnoDB;
