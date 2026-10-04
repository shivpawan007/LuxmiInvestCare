# GA4 + UTM + Power BI setup

## GA4

Set the production environment variable:

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

The application sends no name, mobile number, email address, enquiry text, address, or other PII to Google Analytics.

Tracked events include:
- page_view
- lead_submit
- phone_click
- email_click
- whatsapp_click

UTM fields captured from inbound URLs:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

The first-touch source and latest campaign source are retained in browser localStorage and submitted with a lead only when the visitor submits the contact form.

Example campaign URL:
https://luxmiinvestcare.com/contact?utm_source=google&utm_medium=cpc&utm_campaign=mutual_fund_education

## Power BI

1. Run database/2026-10-04-add-marketing-attribution.sql once.
2. Run database/powerbi-reporting-views.sql once.
3. Create a dedicated read-only MySQL reporting user.
4. Grant SELECT only on the four vw_powerbi_* views.
5. Connect Power BI to the reporting database/server using the read-only account.
6. Build the first four report pages:
   - Executive: leads, conversion rate, new/contacted/converted
   - Marketing: source, medium, campaign, landing page
   - CRM: status, priority, assignment, lead aging
   - Attribution: first-touch vs last-touch source and campaign

Do not grant Power BI INSERT, UPDATE, DELETE, ALTER, DROP or application-database write permissions.

## GA4 privacy rule

GA4 is for aggregate web/marketing analytics. Lead PII remains in the application database and CRM/admin portal.
