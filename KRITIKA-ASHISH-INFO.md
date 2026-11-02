# Kritika weds Ashish — what changed in this ditto copy

This folder is a ditto copy of https://github.com/divyanshu76/invitation-card
(same React + Vite + TypeScript code, same design, same components, same
Krishna flute audio, same generic ritual images). Only the information was
swapped to the Chouhan Parivar printed card:

- `src/data/weddingData.ts`: Kritika (Gungun) weds Ashish, countdown to
  25 November 2026, 7:00 PM IST (Barat Swagat), venue P.S. Baag Marriage
  Garden, Gopi Nagar, Kalwad Road, Jhotwara, Jaipur, family contacts and
  WhatsApp RSVP to +91 9166652239.
- Texts: envelope date, index title/description, RSVP messages, venue
  map, closing section, and the Baraat card — which in the original was
  hard-coded to Mau / 4 PM, so it now reads the weddingData announcement
  (Barat Swagat, 25 Nov, 7 PM, Jaipur) instead.
- Photos: `public/images/hero.jpg` and the Image Carousel originals +
  optimized WebP files are Kritika and Ashish's 5 photos (photo-2
  traditional is the hero). No photo of the original couple remains in
  this copy. The gallery shows 5 slides — one per real photo, no duplicate.
- Haldi / Mehendi: dates/times are NOT on the printed card, so they are
  shown as wedding-week celebrations, date to be announced. Edit the
  `haldi` / `mehendi` entries in `src/data/weddingData.ts` once confirmed.
- Added for deployment only: `vercel.json` (Vite build, `dist/` output).

Run: `npm install && npm run build` — output in `dist/`.
