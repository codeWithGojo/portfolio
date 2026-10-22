# Portfolio motion and installable app changes

Removed the decorative-motion pause switch and retained scroll reveals, portrait interaction and reading progress. Shared Motion spring gestures cover buttons and links, respecting the system reduced-motion preference.

Added a standalone manifest, branded 192/512 icons and Apple touch icon, install button in the existing navigation, installation guidance and an offline fallback service worker. The installer waits for React navigation to mount and never prompts without a button press.

Verified: Vite production build, Chromium mobile navigation/install guidance, zero installability errors, valid icon sizes, active service worker and offline fallback. Physical OS installation was not tested.

## Changed and new files

### Application and build

- `MOTION_CHANGES.md` (new)
- `index.html`
- `package-lock.json`
- `package.json`
- `src/Motion.tsx`

### Installable app

- `public/icons/apple-touch-icon.png` (new)
- `public/icons/icon-192.png` (new)
- `public/icons/icon-512.png` (new)
- `public/install-app.css` (new)
- `public/install-app.js` (new)
- `public/manifest.webmanifest` (new)
- `public/offline.html` (new)
- `public/sw.js` (new)

### Shared

- `shared/motion/config.ts` (new)
- `shared/motion/useDomMotion.ts` (new)
