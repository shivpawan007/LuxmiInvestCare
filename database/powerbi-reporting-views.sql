-- Luxmi InvestCare Power BI reporting layer
-- These views are intended for a dedicated read-only reporting connection.
-- Do NOT expose the production application database directly to the public internet.

CREATE OR REPLACE VIEW vw_powerbi_leads AS
SELECT
    l.id AS lead_id,
    l.created_at AS created_at,
    l.updated_at AS updated_at,
    l.status AS lead_status,
    l.priority AS lead_priority,
    l.lead_source AS lead_source,
    l.landing_page AS landing_page,
    l.utm_source,
    l.utm_medium,
    l.utm_campaign,
    l.utm_content,
    l.utm_term,
    l.first_touch_source,
    l.last_touch_source,
    l.assigned_user_id,
    au.full_name AS assigned_user_name
FROM leads l
LEFT JOIN users au ON au.id = l.assigned_user_id;

CREATE OR REPLACE VIEW vw_powerbi_lead_activity AS
SELECT
    a.id AS activity_id,
    a.lead_id,
    a.activity_type,
    a.activity_note,
    a.created_at AS activity_created_at,
    a.user_id,
    u.full_name AS activity_user_name
FROM lead_activities a
LEFT JOIN users u ON u.id = a.user_id;

CREATE OR REPLACE VIEW vw_powerbi_campaign_performance AS
SELECT
    COALESCE(NULLIF(l.utm_source, ''), 'direct') AS utm_source,
    COALESCE(NULLIF(l.utm_medium, ''), 'none') AS utm_medium,
    COALESCE(NULLIF(l.utm_campaign, ''), 'none') AS utm_campaign,
    DATE(l.created_at) AS lead_date,
    COUNT(*) AS leads,
    SUM(CASE WHEN l.status = 'Converted' THEN 1 ELSE 0 END) AS converted_leads,
    SUM(CASE WHEN l.status = 'New' THEN 1 ELSE 0 END) AS new_leads,
    SUM(CASE WHEN l.status = 'Contacted' THEN 1 ELSE 0 END) AS contacted_leads,
    SUM(CASE WHEN l.status = 'Lost' THEN 1 ELSE 0 END) AS lost_leads
FROM leads l
GROUP BY
    COALESCE(NULLIF(l.utm_source, ''), 'direct'),
    COALESCE(NULLIF(l.utm_medium, ''), 'none'),
    COALESCE(NULLIF(l.utm_campaign, ''), 'none'),
    DATE(l.created_at);

CREATE OR REPLACE VIEW vw_powerbi_lead_funnel AS
SELECT
    DATE(l.created_at) AS lead_date,
    l.lead_source,
    COUNT(*) AS total_leads,
    SUM(CASE WHEN l.status = 'New' THEN 1 ELSE 0 END) AS new_leads,
    SUM(CASE WHEN l.status = 'Contacted' THEN 1 ELSE 0 END) AS contacted_leads,
    SUM(CASE WHEN l.status = 'Follow-up' THEN 1 ELSE 0 END) AS follow_up_leads,
    SUM(CASE WHEN l.status = 'Converted' THEN 1 ELSE 0 END) AS converted_leads,
    SUM(CASE WHEN l.status IN ('Closed','Lost') THEN 1 ELSE 0 END) AS closed_or_lost_leads
FROM leads l
GROUP BY DATE(l.created_at), l.lead_source;
