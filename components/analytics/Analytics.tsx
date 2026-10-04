"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getMarketingAttribution } from "@/lib/attribution";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (
      command: string,
      target: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined" || !GA_ID || !window.gtag) {
    return;
  }

  window.gtag("event", name, params);
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    getMarketingAttribution();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") {
      return;
    }

    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!GA_ID) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
      } else if (href.includes("wa.me") || href.includes("whatsapp")) {
        trackEvent("whatsapp_click", {
          link_url: href,
          page_path: window.location.pathname,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="luxmi-ga4"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
