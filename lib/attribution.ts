export type MarketingAttribution = {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  landingPage: string | null;
  firstTouchSource: string | null;
  lastTouchSource: string | null;
};

const STORAGE_KEY = "luxmi_marketing_attribution_v1";

function clean(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, 190) : null;
}

export function getMarketingAttribution(): MarketingAttribution {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
      landingPage: null,
      firstTouchSource: null,
      lastTouchSource: null,
    };
  }

  let stored: Partial<MarketingAttribution> = {};

  try {
    stored = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "{}",
    );
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const current = {
    utmSource: clean(params.get("utm_source")),
    utmMedium: clean(params.get("utm_medium")),
    utmCampaign: clean(params.get("utm_campaign")),
    utmContent: clean(params.get("utm_content")),
    utmTerm: clean(params.get("utm_term")),
    landingPage: clean(window.location.pathname),
  };

  const hasCampaign = Boolean(
    current.utmSource ||
    current.utmMedium ||
    current.utmCampaign ||
    current.utmContent ||
    current.utmTerm,
  );

  const firstTouchSource =
    clean(stored.firstTouchSource || null) ||
    current.utmSource ||
    (document.referrer ? new URL(document.referrer).hostname : "direct");

  const lastTouchSource =
    current.utmSource ||
    clean(stored.lastTouchSource || null) ||
    firstTouchSource;

  const next = {
    utmSource: current.utmSource || clean(stored.utmSource || null),
    utmMedium: current.utmMedium || clean(stored.utmMedium || null),
    utmCampaign: current.utmCampaign || clean(stored.utmCampaign || null),
    utmContent: current.utmContent || clean(stored.utmContent || null),
    utmTerm: current.utmTerm || clean(stored.utmTerm || null),
    landingPage: current.landingPage || clean(stored.landingPage || null),
    firstTouchSource,
    lastTouchSource,
  };

  if (hasCampaign || !stored.firstTouchSource) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next),
      );
    } catch {
      // Attribution is helpful but must never block the website.
    }
  }

  return next;
}
