# IMEGU.WORLD — Redesign audit and limitations

## Initial source diagnosis (15 November 2026)
- The latest multi-page experience contained an active `src/world.css` layer that overrode the original burgundy palette with blue accents in both themes.
- The home route included a Coding Ninja splash, though the repository already contained a separate circular intro concept in `src/Entrance.tsx` that established a useful personal-identity direction.
- `index.html` directly included the install-app stylesheet, installation JavaScript and PWA manifest; `public/install-app.js` registered `/sw.js`.
- Project previews were comparatively restrained, and the Home page repeated the “A little perspective” reflection that belongs in the personal Hobbies journey.
- Hobbies relied heavily on text stand-ins rather than recognizable album imagery and differentiated visual compositions.

## Scope of this branch
Restore burgundy palette, implement a compact personal circular signature, change typography, animate wordmark, remove install/PWA entry points, move the duplicate philosophy copy into Hobbies, enlarge project previews, add bounded magnetic hover, polish music and anime interactions, and introduce a separate Saka appreciation chapter while keeping existing functionality and personal narrative.

## Important boundaries
- Official music playback/artwork is provided by third-party Spotify embeds; whether they render or allow playback depends on Spotify's geographic availability, account and browser conditions.
- Photographs from specific football events must match the events and satisfy rights requirements. None has been falsely labelled or synthetically reconstructed as documentary imagery.
- The anime section needs appropriately licensed character artwork before visual-photo replacements. Until then, interactive editorial card treatments are intentional.
- Personal image upscaling/denoising is not claimed; present optimized sources were retained. Original high-resolution photographs are still needed for a genuine enhancement pass.
- Impeccable CLI/skill could not be executed in this conversation; manual Gojo Web Design/Impeccable-style critique was applied.
- If a browser screenshot or build execution is unavailable, it must be stated in the pull request rather than assumed successful.
