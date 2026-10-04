-- Luxmi InvestCare marketing attribution migration
-- Run once against the production MySQL database.
-- This migration adds first-touch / last-touch UTM attribution to leads.
-- It intentionally stores no GA client identifiers and no personal data in GA4.

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN utm_source VARCHAR(190) NULL AFTER landing_page',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'utm_source'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN utm_medium VARCHAR(190) NULL AFTER utm_source',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'utm_medium'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN utm_campaign VARCHAR(190) NULL AFTER utm_medium',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'utm_campaign'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN utm_content VARCHAR(190) NULL AFTER utm_campaign',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'utm_content'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN utm_term VARCHAR(190) NULL AFTER utm_content',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'utm_term'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN first_touch_source VARCHAR(190) NULL AFTER utm_term',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'first_touch_source'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'ALTER TABLE leads ADD COLUMN last_touch_source VARCHAR(190) NULL AFTER first_touch_source',
    'SELECT 1'
  )
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND column_name = 'last_touch_source'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Recommended indexes for Power BI/reporting queries.
SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_leads_utm_campaign ON leads (utm_campaign)',
    'SELECT 1'
  )
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND index_name = 'idx_leads_utm_campaign'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = (
  SELECT IF(
    COUNT(*) = 0,
    'CREATE INDEX idx_leads_created_at ON leads (created_at)',
    'SELECT 1'
  )
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'leads'
    AND index_name = 'idx_leads_created_at'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
