# Favour Imegu’s portfolio

Personal portfolio for [imegu.world](https://imegu.world). It covers selected projects and case studies, services, contact, and personal stories.

## Development

Use Node.js 22.12+ or a newer LTS and install locked dependencies with `npm ci`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite development server with live updates |
| `npm run typecheck` | TypeScript checks |
| `npm run test:design` | Design regression checks |
| `npm test` | Design, contact and built-output SEO checks |
| `node --test tests/contact.test.mjs` | Contact endpoint tests with mocked email delivery |
| `npm run build` | Build the browser and server bundles, then prerender pages into `dist/` |
| `npm run preview` | Serve the production build locally |

## Structure

- `src/pages/` contains route components, with shared UI in `src/components/` and portfolio content in `src/data/` and `src/projects.ts`.
- `src/router.tsx` defines shared browser and prerender routes. The browser hydrates the prerendered HTML and loads page code by route.
- `src/entry-server.tsx` and `scripts/prerender.mjs` write route HTML, metadata and sitemap entries at build time.
- `api/contact.mjs` handles contact enquiries on Vercel.

## Vercel preview

Run the same build command on Vercel and serve `dist/`. The Vercel Function at `/api/contact` needs `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` set in the Preview environment for real delivery. See [contact setup](docs/contact-setup.md) for sender verification, development API testing and deployment checks. The static Vite preview does not serve the Vercel Function.

See [asset credits and responsive variants](docs/assets.md) and the [cleanup audit](docs/cleanup-audit.md).

## Browser verification

After `npm run build`, run `npm run preview -- --port 4175`. With Python Playwright and Chrome installed, run `python tests/overhaul-browser.py` and `python tests/motion-browser.py`. Set `BASE_URL` to test a deployment. Contact browser responses are mocked and do not send email. See [verification and limitations](docs/verification.md).
