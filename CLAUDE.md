# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js version warning

[AGENTS.md](AGENTS.md) states this is a Next.js version (16.x, React 19) with breaking changes from what you may know. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`, ...). Note that middleware is named `src/proxy.ts` (exporting `proxy`), not `middleware.ts`.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — `next build` then `scripts/copy-standalone-assets.mjs` (output is `standalone`; required before tests/start)
- `npm start` — runs `node .next/standalone/server.js` (not `next start`)
- `npm run lint` / `npm run typecheck` — ESLint / `tsc --noEmit`
- `npm test` — API validation & security suite (`scripts/test-api.mjs`)
- `npm run test:smoke` — page/SEO/redirect smoke suite (`scripts/test-smoke.mjs`)

Both test scripts are plain Node scripts (no test framework, no single-test runner) that fetch `TEST_URL` (default `http://localhost:3000`). If nothing responds on `/api/health`, they spawn `.next/standalone/server.js` themselves, so run `npm run build` first. CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs lint → typecheck → build → both test suites on Node 22.

## Architecture

Marketing/export-catalogue site for Jay Impex (Chennai-based commodities exporter, est. 1990), modernized from the static HTML in `legacy/` (kept for reference only). App Router under `src/app`, path alias `@/*` → `src/*`, Tailwind v4 via `@tailwindcss/turbopack` (configured in `next.config.ts`).

- **Product catalogue is data-driven**: all products live in `src/data/products.ts` (`PRODUCTS` array, typed `Product`). `products/page.tsx` and `products/[slug]/page.tsx` render from it; `sitemap.ts` derives product URLs from it too, so adding a product means editing only that file (images in `public/images/`).
- **Legacy SEO cutover**: old `.html`/`sendmail.php` URLs are 301-redirected in `next.config.ts` `redirects()`. Keep these when changing routes. Canonical host is `https://www.jayimpex.net` (`metadataBase` in `src/app/layout.tsx`).
- **Security headers/CSP** are set globally in `src/proxy.ts` (matcher excludes static assets/images). CSP only allows Google Fonts and `'self'` for forms — update it if adding external resources.
- **RFQ contact API** (`src/app/api/contact/route.ts`): zod-validated, in-memory per-IP rate limit (5 / 10 min; resets on restart, single replica), 100KB body cap, honeypot + <2.5s render-timestamp anti-spam (both silently return fake success), CRLF header sanitisation, then nodemailer. Env vars: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT` (587), `CONTACT_EMAIL` (default info@jayimpex.net); without SMTP creds it falls back to non-sending behaviour. `/api/health` backs the Railway healthcheck.
- **Deployment**: Docker multi-stage build (Node 22 alpine, standalone output) deployed on Railway ([railway.json](railway.json)).
- `docs/` holds the PRD, backlog, and implementation plan (phased/epic-based; branches are `feature/phase-N-*`).
