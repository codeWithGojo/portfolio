# IMEGU.WORLD — Design system & review brief

This document records **Gojo Web Design** priorities and an **Impeccable-inspired** manual review sequence. It does **not** claim that the Impeccable CLI or skill ran: it was unavailable in the connected-chat environment.

## Identity
The visitor should feel like they are entering Favour's world: an editorial personal experience, rich and assured but never self-important. Use photography and real screenshots as the principal storytelling medium. Allow deliberate changes in composition rather than repeating one grid of identical cards.

## Palette
Dark-mode foundation:
- `--bg: #0D090B` — near-black canvas
- `--bg-deep: #090608` — extra depth
- `--panel: #260D17` — burgundy surface
- `--text: #F5EFEF` — ivory display/body
- `--accent: #C4314D` — expressive interaction red
- `--accent-bright: #E25B77` — brighter hover state
- `--muted: #D4B6BD` — readable supporting text

Light mode: `#FBF5F3` canvas, `#FFF AF8` (without the space: `#FFFAF8`) panel, `#2B0B17` ink and `#871A33` accent. All accents and surfaces should obey contrast semantics, not decorative novelty. No blue, neon-green or generic purple-gradient branding.

## Typography
- **Syne** for bold editorial headings; restrained tracking and line length.
- **DM Sans** for fluent reading.
- **JetBrains Mono** for rare micro-labels and coding-inspired details.
- **Space Grotesk** for existing technical accents and graceful fallback.

Fonts are loaded from Google Fonts in the HTML document. Audit missing-glyph fallbacks and render performance on mobile.

## Composition
- Main page shell: `max-width: 1280px`; responsive horizontal gutters `clamp(20px, 5vw, 76px)`.
- Clear hierarchy, generous breathing room, editorial large project screenshots, and different visual weights for the featured Afri Index and BlessingFoundHerBlessing projects.
- Hobbies should balance pictures/embeds, reflections and interactive details rather than reading as one uninterrupted block.
- Protect the footer, skip-to-content link and navigation from overlays.

## Motion vocabulary
- Intro: short session-aware circular “IMEGU FAVOUR” signature, escapable, skipped with reduced motion.
- Identity: subtle wordmark reveal, finite cursor animation, quiet hover echo.
- Interactive buttons: bounded magnetic displacement under fine-pointer hover only. Touch and keyboard do not depend on it.
- Hover: approximately 180–280ms; content transitions: approximately 300–450ms; page-level reveals: approximately 450–700ms when appropriate.
- Page navigation: modest native same-origin view transition in supporting browsers; natural navigation in others. Never turn each click into a long splash.
- Existing dust filter, animated Arsenal background and Starboy Easter egg remain.
- Prefer transform/opacity; suspend decorative motion when off-screen; honor `prefers-reduced-motion`.

## Components and accessibility
Ensure visible keyboard focus, semantic details/summary for stories, accessible links and buttons, meaningful alt text, no duplicate interactive paths, and a comfortable touch target. The contact form must continue producing a reviewed WhatsApp/mailto message, not falsely pretend to send it automatically. Resize imagery without crop destroying the point of the photo.

## Review process
1. **Critique** generic composition, repetitive labels and sterile headings.
2. **Typeset / colorize / layout** identity tokens, readable hierarchy and photo-to-text proportions.
3. **Distill / bolder** emphasize the work and experiences rather than decorations.
4. **Animate / delight / adapt** refine motion and ensure mobile behavior.
5. **Harden / optimize / polish** test all navigation, deep links, keyboard, reduced motion, images and platform fallback.

## Test matrix
360px and 390px mobile, tablet and 1440px desktop. Verify Home, About, Work filters, 12 case studies, Hobbies interactions, Pricing, Contact and theme toggle. There should be no horizontal overflow, broken images, awkward font wraps or missing focus indicators.

## Media licensing backlog
Official embed links cover the selected music releases, but confirm that the provider embeds display the intended releases and actual artwork. A real, licensed Bukayo Saka portrait and exact photos for the named Arsenal matches are needed before adding documentary photography. Anime character art requires approved sources. Enhance personal photos only from the original assets with a documented edit and preserve source images.
