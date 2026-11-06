// Build-time: generate dist/ashish/index.html from the built dist/index.html
// with Ashish-route title and Open Graph tags.
//
// Why: the site is a client-side SPA. WhatsApp's link-preview crawler does
// not run JavaScript, so the in-browser tab title set in App.tsx never
// reaches it — it reads the static <title> in index.html, which is the
// same "Kritika & Ashish" for every route. Vercel serves a static file
// when one exists at the request path (before the SPA catch-all rewrite),
// so a real dist/ashish/index.html is what the crawler gets for /ashish.
// The app still boots from it: all asset paths are absolute (/assets/...).
//
// Only the title / description / OG tags change. No image tag is added,
// so WhatsApp keeps picking its preview image the same way as before.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = join(root, 'dist', 'index.html');

const ASHISH_TITLE = 'Ashish weds Kritika — Shubh Vivah | 25 November 2026, Jaipur';
const ASHISH_DESCRIPTION =
  'Ashish weds Kritika — Modi Parivar ka snehpoorn nimantran. Shubh Vivah, 25 November 2026, P.S. Baag Marriage Garden, Jhotwara, Jaipur.';
const ASHISH_URL = 'https://kritika-weds-ashish-dev7nshs-projects.vercel.app/ashish';

const html = readFileSync(distIndex, 'utf8');

if (!/<title>[^<]*<\/title>/.test(html)) {
  throw new Error('generate-route-html: no <title> found in dist/index.html');
}
if (!/name="description"/.test(html)) {
  throw new Error('generate-route-html: no meta description found in dist/index.html');
}

const out = html
  .replace(/<title>[^<]*<\/title>/, `<title>${ASHISH_TITLE}</title>`)
  .replace(
    /(<meta name="description"[^>]*content=")[^"]*(")/,
    `$1${ASHISH_DESCRIPTION}$2`,
  )
  .replace(
    /(<title>[^<]*<\/title>)/,
    `$1\n  <meta property="og:title" content="${ASHISH_TITLE}" />\n  <meta property="og:description" content="${ASHISH_DESCRIPTION}" />\n  <meta property="og:type" content="website" />\n  <meta property="og:url" content="${ASHISH_URL}" />`,
  );

const outDir = join(root, 'dist', 'ashish');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), out);
console.log('generate-route-html: wrote dist/ashish/index.html');
