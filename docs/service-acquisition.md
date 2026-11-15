# Service acquisition pages

The `/services` hub and four detail pages describe the current services, show related portfolio work and link to a scoped contact enquiry. Prices remain as published on `/pricing`: ₦150,000–₦300,000 for a focused landing page; all other project work is quoted to agreed scope. Domains, hosting, subscriptions and maintenance are treated separately in proposals.

## Canonical pages

- `/services`
- `/services/website-development`
- `/services/ecommerce-development`
- `/services/erp-inventory`
- `/services/custom-software`

Each route is included in `src/data/seo.ts`; the prerender script writes route HTML and sitemap entries from this registry. Search Console can inspect the production routes after the change is deployed. Inclusion in the sitemap does not mean Google has indexed a page.

Mobile preview screenshots are included for review: [Services hub](screenshots/services-hub-mobile.png) and [Website Development](screenshots/website-development-mobile.png).

## Contact IDs

Quote links and the contact selector use `website-development`, `ecommerce-development`, `erp-inventory`, and `custom-software`. The contact page still accepts the former `business-website`, `ecommerce`, `business-systems`, and `web-application` query values as aliases. The server email receives the readable project type rather than the ID.

## Conversion analytics (off by default)

No event is sent unless `VITE_ENABLE_ANALYTICS=true` is explicitly set at build time. Before enabling it, turn on Web Analytics for the Vercel project and review the applicable privacy notice for the site. The integration uses Vercel Web Analytics and tracks only these event names, without custom properties:

- `service_page_view`
- `quote_cta_click`
- `whatsapp_click`
- `contact_form_success` (after the contact endpoint confirms success)
- `project_demo_click`
- `pricing_page_view`

Names only are sent. Form fields, messages, email addresses, phone numbers, selected service, and budget are never attached to events. Leave the variable unset or `false` until analytics has been deliberately configured. Vercel Analytics availability and event limits depend on the Vercel plan; check the project dashboard before activation.

## Evidence notes

Cantica is described as a pre-launch concept rather than a transactional shop. ExpenseAI's public workspace is browser-local. Afri Index and TerraScope are independent live products; PredictArena is in development. The site does not currently publish a verified client ERP deployment, so the ERP page uses related dashboard examples and makes that limitation clear. No private Matong ERP information is included.
