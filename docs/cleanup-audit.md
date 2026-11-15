# Legacy cleanup audit

## Removed source

The client entry imports `world.css`, `styles/foundation.css`, and `styles/fonts.css`. Route and component modules load their own CSS. Neither the runtime module graph, prerender entry, nor design tests imported the old `styles.css`, `collection.css`, or `theme-toggle.css`. The old `Entrance.tsx` imported `entrance.css` but had no callers. The old `Motion.tsx` and its private `shared/motion` helpers likewise had no callers. The current motion implementation lives in `WorldMotion.tsx` and page components.

The standalone `public/afri-index.html` has its own CSS and JavaScript and does not depend on those files. Removing the legacy files does not remove any stylesheet from the live import graph.

## Historical records

The original implementation and delivery plans are preserved under [docs/archive](archive/). Root-level repository guidance and visual design references remain in place.

## Preview inventory

Of 30 files in `public/previews`, 10 are referenced by current project records. The 20 files below have no references in the checked source, build scripts, public HTML, metadata or tests. Earlier site versions used some of these paths. The originals remain in the public tree for historical access. Current responsive derivatives are documented in [the asset inventory](assets.md).

- `public/previews/afri-2026-10-11.jpg`
- `public/previews/afri-2026-10-22.jpg`
- `public/previews/afri-2026-10-26.jpg`
- `public/previews/afri.webp`
- `public/previews/cantica.webp`
- `public/previews/dev-boyz-2026-10-11.jpg`
- `public/previews/expense-2026-10-11.jpg`
- `public/previews/expense.webp`
- `public/previews/fpl-2026-10-11.jpg`
- `public/previews/fpl-premium-2026-10-26.jpg`
- `public/previews/fpl.webp`
- `public/previews/generator.webp`
- `public/previews/naira.webp`
- `public/previews/predictarena-premium-2026-10-26.jpg`
- `public/previews/terra-2026-10-11.jpg`
- `public/previews/terra-2026-10-22.jpg`
- `public/previews/terra-2026-10-26.jpg`
- `public/previews/terra.webp`
- `public/previews/wedding-2026-10-11.jpg`
- `public/previews/wedding-premium-2026-10-26.jpg`
