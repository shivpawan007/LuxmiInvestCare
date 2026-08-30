-- =========================================================
-- ACCESS / USERS
-- =========================================================

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_key VARCHAR(40) NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_roles_key (role_key)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    role_id BIGINT UNSIGNED NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(190) NOT NULL,
    mobile VARCHAR(20) NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    last_login_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email),
    KEY idx_users_role (role_id),
    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id) REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================================================
-- LEADS / CRM
-- =========================================================

CREATE TABLE IF NOT EXISTS leads (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(190) NULL,
    enquiry TEXT NULL,

    lead_source VARCHAR(80) NOT NULL DEFAULT 'website',
    landing_page VARCHAR(500) NULL,
    utm_source VARCHAR(150) NULL,
    utm_medium VARCHAR(150) NULL,
    utm_campaign VARCHAR(150) NULL,

    status VARCHAR(40) NOT NULL DEFAULT 'New',
    priority VARCHAR(20) NOT NULL DEFAULT 'Normal',

    assigned_user_id BIGINT UNSIGNED NULL,

    last_contacted_at DATETIME NULL,
    converted_at DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY idx_leads_mobile (mobile),
    KEY idx_leads_status (status),
    KEY idx_leads_source (lead_source),
    KEY idx_leads_assigned_user (assigned_user_id),
    KEY idx_leads_created_at (created_at),

    CONSTRAINT fk_leads_assigned_user
        FOREIGN KEY (assigned_user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lead_assignments (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    lead_id BIGINT UNSIGNED NOT NULL,
    assigned_to BIGINT UNSIGNED NULL,
    assigned_by BIGINT UNSIGNED NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    unassigned_at DATETIME NULL,
    reason VARCHAR(255) NULL,
    PRIMARY KEY (id),
    KEY idx_la_lead (lead_id),
    KEY idx_la_assigned_to (assigned_to),
    CONSTRAINT fk_la_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_la_assigned_to
        FOREIGN KEY (assigned_to) REFERENCES users(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_la_assigned_by
        FOREIGN KEY (assigned_by) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lead_activities (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    lead_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    activity_type VARCHAR(60) NOT NULL,
    activity_note TEXT NULL,
    metadata JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_activities_lead (lead_id),
    KEY idx_activities_user (user_id),
    KEY idx_activities_created_at (created_at),
    CONSTRAINT fk_activities_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_activities_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- CLIENTS
-- =========================================================

CREATE TABLE IF NOT EXISTS clients (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    lead_id BIGINT UNSIGNED NULL,
    full_name VARCHAR(150) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    email VARCHAR(190) NULL,
    client_status VARCHAR(40) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_clients_lead (lead_id),
    KEY idx_clients_mobile (mobile),
    CONSTRAINT fk_clients_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- CONSENT / PRIVACY
-- =========================================================

CREATE TABLE IF NOT EXISTS consents (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    lead_id BIGINT UNSIGNED NULL,
    client_id BIGINT UNSIGNED NULL,
    purpose VARCHAR(80) NOT NULL,
    notice_version VARCHAR(50) NULL,
    consent_status VARCHAR(30) NOT NULL,
    consent_text_hash VARCHAR(128) NULL,
    source VARCHAR(80) NULL,
    given_at DATETIME NULL,
    withdrawn_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_consents_lead (lead_id),
    KEY idx_consents_client (client_id),
    CONSTRAINT fk_consents_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_consents_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- FINANCIAL PROFILE
-- =========================================================

CREATE TABLE IF NOT EXISTS financial_profiles (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    income_band VARCHAR(60) NULL,
    monthly_surplus_band VARCHAR(60) NULL,
    liquidity_need VARCHAR(60) NULL,
    investment_horizon VARCHAR(60) NULL,
    existing_investments_summary TEXT NULL,
    existing_insurance_summary TEXT NULL,
    dependants_count INT NULL,
    data_sensitivity_level VARCHAR(30) NOT NULL DEFAULT 'standard',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_financial_profile_client (client_id),
    CONSTRAINT fk_financial_profiles_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- GOALS
-- =========================================================

CREATE TABLE IF NOT EXISTS goals (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    goal_type VARCHAR(80) NOT NULL,
    goal_name VARCHAR(150) NOT NULL,
    target_date DATE NULL,
    current_cost DECIMAL(18,2) NULL,
    inflation_assumption DECIMAL(6,3) NULL,
    priority VARCHAR(30) NOT NULL DEFAULT 'Normal',
    status VARCHAR(30) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_goals_client (client_id),
    CONSTRAINT fk_goals_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- RISK
-- =========================================================

CREATE TABLE IF NOT EXISTS risk_assessments (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    questionnaire_version VARCHAR(50) NOT NULL,
    risk_capacity_score DECIMAL(8,2) NULL,
    risk_tolerance_score DECIMAL(8,2) NULL,
    risk_profile VARCHAR(80) NULL,
    completed_at DATETIME NULL,
    review_due_at DATETIME NULL,
    created_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_risk_client (client_id),
    CONSTRAINT fk_risk_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_risk_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS risk_assessment_answers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    assessment_id BIGINT UNSIGNED NOT NULL,
    question_id VARCHAR(80) NOT NULL,
    answer TEXT NULL,
    score DECIMAL(8,2) NULL,
    PRIMARY KEY (id),
    KEY idx_risk_answers_assessment (assessment_id),
    CONSTRAINT fk_risk_answers_assessment
        FOREIGN KEY (assessment_id) REFERENCES risk_assessments(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- INSURANCE
-- =========================================================

CREATE TABLE IF NOT EXISTS insurers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    insurer_name VARCHAR(150) NOT NULL,
    insurer_type VARCHAR(50) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_insurers_name (insurer_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS insurance_products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    insurer_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    insurance_type VARCHAR(40) NOT NULL,
    product_code VARCHAR(100) NULL,
    product_summary TEXT NULL,
    source_url VARCHAR(500) NULL,
    effective_date DATE NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_insurance_products_insurer (insurer_id),
    KEY idx_insurance_products_type (insurance_type),
    CONSTRAINT fk_insurance_products_insurer
        FOREIGN KEY (insurer_id) REFERENCES insurers(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS insurance_needs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    insurance_type VARCHAR(40) NOT NULL,
    coverage_requirement DECIMAL(18,2) NULL,
    family_context TEXT NULL,
    vehicle_context TEXT NULL,
    existing_cover TEXT NULL,
    need_status VARCHAR(40) NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_insurance_needs_client (client_id),
    KEY idx_insurance_needs_type (insurance_type),
    CONSTRAINT fk_insurance_needs_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS insurance_quotes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    insurance_product_id BIGINT UNSIGNED NULL,
    quote_reference VARCHAR(120) NULL,
    premium_amount DECIMAL(18,2) NULL,
    coverage_amount DECIMAL(18,2) NULL,
    quote_data JSON NULL,
    quote_date DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_quotes_client (client_id),
    CONSTRAINT fk_quotes_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_quotes_product
        FOREIGN KEY (insurance_product_id) REFERENCES insurance_products(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- MUTUAL FUND / PRODUCT INFORMATION
-- =========================================================

CREATE TABLE IF NOT EXISTS fund_categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_fund_categories_name (category_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fund_products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    category_id BIGINT UNSIGNED NULL,
    scheme_name VARCHAR(255) NOT NULL,
    scheme_code VARCHAR(120) NULL,
    amfi_code VARCHAR(120) NULL,
    objective TEXT NULL,
    risk_label VARCHAR(80) NULL,
    source_url VARCHAR(500) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_fund_scheme_code (scheme_code),
    KEY idx_fund_category (category_id),
    CONSTRAINT fk_fund_category
        FOREIGN KEY (category_id) REFERENCES fund_categories(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fund_snapshots (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fund_product_id BIGINT UNSIGNED NOT NULL,
    snapshot_date DATE NOT NULL,
    nav DECIMAL(18,8) NULL,
    aum DECIMAL(20,2) NULL,
    expense_ratio DECIMAL(8,4) NULL,
    data_json JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_fund_snapshot (fund_product_id, snapshot_date),
    CONSTRAINT fk_fund_snapshot_product
        FOREIGN KEY (fund_product_id) REFERENCES fund_products(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS fund_documents (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fund_product_id BIGINT UNSIGNED NOT NULL,
    document_type VARCHAR(80) NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    source_url VARCHAR(500) NULL,
    publication_date DATE NULL,
    effective_date DATE NULL,
    document_hash VARCHAR(128) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_fund_documents_product (fund_product_id),
    CONSTRAINT fk_fund_documents_product
        FOREIGN KEY (fund_product_id) REFERENCES fund_products(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- AI
-- =========================================================

CREATE TABLE IF NOT EXISTS ai_model_versions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    provider VARCHAR(100) NOT NULL,
    model_name VARCHAR(150) NOT NULL,
    model_version VARCHAR(100) NULL,
    system_prompt_version VARCHAR(100) NULL,
    guardrail_version VARCHAR(100) NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 0,
    approved_by BIGINT UNSIGNED NULL,
    approved_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_ai_model_approved_by
        FOREIGN KEY (approved_by) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS knowledge_sources (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    source_name VARCHAR(200) NOT NULL,
    source_type VARCHAR(80) NOT NULL,
    source_url VARCHAR(500) NULL,
    is_approved TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS knowledge_documents (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    source_id BIGINT UNSIGNED NULL,
    document_title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NULL,
    publication_date DATE NULL,
    effective_date DATE NULL,
    document_version VARCHAR(80) NULL,
    document_content LONGTEXT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_knowledge_source (source_id),
    CONSTRAINT fk_knowledge_source
        FOREIGN KEY (source_id) REFERENCES knowledge_sources(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    document_id BIGINT UNSIGNED NOT NULL,
    chunk_number INT NOT NULL,
    chunk_text LONGTEXT NOT NULL,
    metadata JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_knowledge_chunks_document (document_id),
    CONSTRAINT fk_knowledge_chunks_document
        FOREIGN KEY (document_id) REFERENCES knowledge_documents(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_sessions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NULL,
    lead_id BIGINT UNSIGNED NULL,
    user_id BIGINT UNSIGNED NULL,
    module VARCHAR(100) NOT NULL,
    mode VARCHAR(80) NOT NULL,
    started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME NULL,
    PRIMARY KEY (id),
    KEY idx_ai_sessions_client (client_id),
    KEY idx_ai_sessions_lead (lead_id),
    CONSTRAINT fk_ai_sessions_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ai_sessions_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ai_sessions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_messages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    session_id BIGINT UNSIGNED NOT NULL,
    role VARCHAR(30) NOT NULL,
    message LONGTEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ai_messages_session (session_id),
    CONSTRAINT fk_ai_messages_session
        FOREIGN KEY (session_id) REFERENCES ai_sessions(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_runs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    session_id BIGINT UNSIGNED NULL,
    model_version_id BIGINT UNSIGNED NULL,
    prompt_version VARCHAR(100) NULL,
    input_summary LONGTEXT NULL,
    output_summary LONGTEXT NULL,
    confidence DECIMAL(8,4) NULL,
    guardrail_result VARCHAR(50) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ai_runs_session (session_id),
    CONSTRAINT fk_ai_runs_session
        FOREIGN KEY (session_id) REFERENCES ai_sessions(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ai_runs_model
        FOREIGN KEY (model_version_id) REFERENCES ai_model_versions(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_recommendations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NULL,
    session_id BIGINT UNSIGNED NULL,
    recommendation_type VARCHAR(80) NOT NULL,
    subject_type VARCHAR(80) NULL,
    subject_id BIGINT UNSIGNED NULL,
    recommendation_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    human_review_required TINYINT(1) NOT NULL DEFAULT 0,
    reviewed_by BIGINT UNSIGNED NULL,
    reviewed_at DATETIME NULL,
    explanation LONGTEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_ai_recommendations_client (client_id),
    CONSTRAINT fk_ai_recommendations_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ai_recommendations_session
        FOREIGN KEY (session_id) REFERENCES ai_sessions(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_ai_recommendations_reviewer
        FOREIGN KEY (reviewed_by) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_guardrail_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    session_id BIGINT UNSIGNED NULL,
    rule_code VARCHAR(120) NOT NULL,
    severity VARCHAR(30) NOT NULL,
    input_excerpt TEXT NULL,
    action_taken VARCHAR(80) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_guardrail_session (session_id),
    KEY idx_guardrail_rule (rule_code),
    CONSTRAINT fk_guardrail_session
        FOREIGN KEY (session_id) REFERENCES ai_sessions(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- ANALYTICS / HEALTH / LEARNING
-- =========================================================

CREATE TABLE IF NOT EXISTS analytics_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NULL,
    lead_id BIGINT UNSIGNED NULL,
    user_id BIGINT UNSIGNED NULL,
    event_name VARCHAR(120) NOT NULL,
    event_category VARCHAR(80) NULL,
    event_data JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_analytics_client (client_id),
    KEY idx_analytics_lead (lead_id),
    KEY idx_analytics_event (event_name),
    CONSTRAINT fk_analytics_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_analytics_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_analytics_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS health_score_snapshots (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    score DECIMAL(8,2) NOT NULL,
    score_version VARCHAR(50) NOT NULL,
    calculation_date DATE NOT NULL,
    major_factors JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_health_client (client_id),
    CONSTRAINT fk_health_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS learning_content (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(80) NOT NULL,
    difficulty VARCHAR(40) NULL,
    content LONGTEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quiz_questions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    learning_content_id BIGINT UNSIGNED NULL,
    question_text TEXT NOT NULL,
    options_json JSON NULL,
    correct_option VARCHAR(50) NULL,
    explanation TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_content
        FOREIGN KEY (learning_content_id) REFERENCES learning_content(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NULL,
    score DECIMAL(8,2) NULL,
    total_questions INT NULL,
    completed_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_quiz_attempt_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- NOTIFICATIONS / MARKETING / KPI
-- =========================================================

CREATE TABLE IF NOT EXISTS notification_templates (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    template_key VARCHAR(100) NOT NULL,
    channel VARCHAR(40) NOT NULL,
    subject VARCHAR(255) NULL,
    body TEXT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_notification_template (template_key)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notification_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NULL,
    lead_id BIGINT UNSIGNED NULL,
    template_id BIGINT UNSIGNED NULL,
    channel VARCHAR(40) NOT NULL,
    event_status VARCHAR(40) NOT NULL DEFAULT 'Pending',
    scheduled_at DATETIME NULL,
    sent_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_notification_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_notification_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_notification_template
        FOREIGN KEY (template_id) REFERENCES notification_templates(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notification_preferences (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    client_id BIGINT UNSIGNED NOT NULL,
    channel VARCHAR(40) NOT NULL,
    enabled TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    UNIQUE KEY uq_notification_preference (client_id, channel),
    CONSTRAINT fk_notification_preferences_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS segments (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    segment_name VARCHAR(120) NOT NULL,
    description TEXT NULL,
    rules_json JSON NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_segment_name (segment_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS segment_members (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    segment_id BIGINT UNSIGNED NOT NULL,
    client_id BIGINT UNSIGNED NULL,
    lead_id BIGINT UNSIGNED NULL,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_segment_members_segment
        FOREIGN KEY (segment_id) REFERENCES segments(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_segment_members_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_segment_members_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS campaigns (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    campaign_name VARCHAR(200) NOT NULL,
    campaign_type VARCHAR(80) NULL,
    segment_id BIGINT UNSIGNED NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_campaign_segment
        FOREIGN KEY (segment_id) REFERENCES segments(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS campaign_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    campaign_id BIGINT UNSIGNED NOT NULL,
    client_id BIGINT UNSIGNED NULL,
    lead_id BIGINT UNSIGNED NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_campaign_events_campaign
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_campaign_events_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_campaign_events_lead
        FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS kpi_definitions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    kpi_key VARCHAR(120) NOT NULL,
    kpi_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    target_value DECIMAL(18,4) NULL,
    target_unit VARCHAR(40) NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_kpi_key (kpi_key)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS kpi_measurements (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    kpi_id BIGINT UNSIGNED NOT NULL,
    measurement_date DATE NOT NULL,
    measured_value DECIMAL(18,4) NULL,
    dimension_data JSON NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_kpi_measurement_date (measurement_date),
    CONSTRAINT fk_kpi_measurements_definition
        FOREIGN KEY (kpi_id) REFERENCES kpi_definitions(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- AUDIT
-- =========================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NULL,
    action VARCHAR(120) NOT NULL,
    entity_type VARCHAR(100) NULL,
    entity_id BIGINT UNSIGNED NULL,
    before_data JSON NULL,
    after_data JSON NULL,
    ip_address VARCHAR(64) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_audit_user (user_id),
    KEY idx_audit_entity (entity_type, entity_id),
    KEY idx_audit_created_at (created_at),
    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

-- =========================================================
-- INITIAL ROLES
-- =========================================================

INSERT INTO roles (role_key, role_name, description)
VALUES
    ('ADMIN', 'Administrator', 'Full system access'),
    ('MANAGER', 'Manager', 'Team and lead management access'),
    ('STAFF', 'Staff User', 'Access to assigned leads and permitted CRM actions')
ON DUPLICATE KEY UPDATE
    role_name = VALUES(role_name),
    description = VALUES(description);