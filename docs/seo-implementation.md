# IMEGU.WORLD SEO implementation

## Current result

The production site already prerenders 18 indexable pages (six main pages and 12 project case studies), serves route-specific titles/descriptions/canonicals, includes a generated sitemap at build time, and publishes `robots.txt`. This work preserves those systems and the existing design, animation and Coding Ninja intro. The generated sitemap excludes the 404 page and updates from the project data. The checked-in `public/sitemap.xml` is a fallback snapshot; the build-generated `dist/sitemap.xml` is authoritative on deployment.

The homepage title now targets the personal name plus web/software development in Nigeria. Its visible lead names the work and Ibadan roots without implying an office. About, services, projects and contact metadata describe their own pages. Hobbies stays personal. Project descriptions derive from the project records and current status/outcome rather than unverified claims. Case studies show breadcrumbs tied to breadcrumb JSON-LD. The pricing page answers four common scoping questions and retains the existing landing-page price range.

JSON-LD connects the verified GitHub account to one Person and WebSite entity and adds page-specific ProfilePage, AboutPage, CollectionPage, ItemList, CreativeWork and BreadcrumbList nodes where they match the rendered page. No fake ratings, reviews, offices or customer figures were added. The opening animation stays deferred after prerendered content.

Vercel deployment hosts ending in `.vercel.app` receive `X-Robots-Tag: noindex, nofollow`; production canonicals and sitemap use HTTPS `imegu.world`. No `lastmod` values are invented.

### Production DNS follow-up

The project has both `imegu.world` and `www.imegu.world` configured and verified in Vercel, with `www` set to redirect to the apex using HTTP 308. Live DNS still delegates to Namecheap (`dns1.registrar-servers.com` and `dns2.registrar-servers.com`), however, and `www.imegu.world` currently resolves to a Namecheap parking host. Consequently, the `www` URL does not reach Vercel and its redirect is not live. Vercel's current domain configuration recommends an apex A record of `76.76.21.21` and a `www` CNAME of `cname.vercel-dns.com`; the apex presently resolves to `216.198.79.1` and serves the site. Update the corresponding records in the external DNS provider, preserving unrelated mail and verification records, then verify both hosts and HTTPS. No DNS change was made as part of this repository PR.

## Research and targeting

On 15 November 2026, search-result samples for web developer Nigeria and Nigerian business software showed a mix of individual developer profiles, web development agencies, and custom ERP/inventory providers. The intent is practical vendor evaluation, often wanting example work, price/scoping and location. For example, the sampled results included an individual Nigerian developer profile ([Build with Ben](https://www.buildwithben.ng/)) and a focused local ERP/inventory vendor ([Devstack](https://www.devstack.ng/)). Search samples do not provide search-volume or ranking-difficulty data. The homepage targets name plus broad role; pricing targets services and quote intent; FireSafe, Afri Index and TerraScope target their specific demonstrated project topics. No separate city doorway pages were created. Nigeria and Ibadan are used where accurate; Delta/Asaba are not claimed as office locations. Follow actual queries in Search Console before expanding niche service pages.

## Verification

`npm test` runs the existing design and contact checks and `tests/seo.test.mjs` over the production prerender output. The SEO checks parse every JSON-LD block, verify unique titles and canonicals, H1s, descriptions, social-image files, sitemap route coverage, robots reference and 404 `noindex`. Check the Vercel preview source and headers separately before merge. Structured data syntax is tested locally; Google Rich Results availability is not implied for these schema types.

## Search Console setup

1. Sign in to the Google account that should own the property and add a **Domain** property for `imegu.world` in [Google Search Console](https://search.google.com/search-console).
2. Copy the TXT verification value Search Console provides and add it at the DNS provider for `imegu.world`. Keep existing records. DNS access is outside this repository.
3. After verification, submit `https://imegu.world/sitemap.xml` once. Use URL Inspection for `/`, `/about`, `/pricing`, `/work/firesafe`, `/work/afri-index` and `/work/terrascope`; request indexing only where Google offers it.
4. Review Page indexing, HTTPS and Core Web Vitals reports over time. Search results and indexing can take time; publication does not guarantee inclusion or ranking.

The connected Google account was not available here, so property creation, DNS verification, submission and URL inspections have not been performed.

## Bing and measurement

Add `imegu.world` in [Bing Webmaster Tools](https://www.bing.com/webmasters), verify by the offered DNS TXT method, submit the same sitemap and inspect crawl/indexing diagnostics. No Bing account was connected, so no submission or indexing is claimed.

A repository search found no Google Analytics, Plausible or Vercel Web Analytics implementation. No tracking script was added without the needed analytics-account/privacy choices. If analytics are enabled, count only successful contact responses, mailto/WhatsApp clicks, résumé downloads and project outbound links. Never send contact text or email addresses as event data; update the privacy notice before enabling visitor tracking if the selected tool requires it.

## Outstanding opportunities

- Create an original, evidence-led FireSafe article about the actual ESP32 + MQ-2/DHT11 + Flask/Supabase prototype, explaining the local alarm failsafe and its academic-project status.
- Add a case study for Matong ERP only after confirming which public, non-confidential workflows can be described.
- Publish sourcing and update notes for Afri Index and TerraScope when there are meaningful product changes; the existing project pages already explain the methodology and scope.
- Use Search Console queries and enquiry conversations to decide whether e-commerce, ERP or maintenance deserves a deeper service page. Do not create thin city pages.
