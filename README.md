# Jay Impex Website

Marketing and export-catalogue website for **Jay Impex**, a government-recognized commodities export house established in **1990** and headquartered in Chennai, India. Production site: https://www.jayimpex.net

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript. It replaces the static HTML site preserved in [legacy/](legacy/).

## Products

The catalogue lives in [src/data/products.ts](src/data/products.ts) and renders at `/products` and `/products/[slug]`. Each product has an HS code, origin, packaging options, specifications, certifications, shelf life and minimum order quantity.

| Category | Products |
| --- | --- |
| Rice | Deity 1121 Steam Basmati, Deity 1509 Golden Sella Basmati, Sugandha Steam Long Grain, Parboiled Non-Basmati |
| Millets, nuts & oilseeds | Ragi (Finger Millet), Sesame Seeds, Groundnut Kernels |
| Spices | Salem Turmeric, Guntur Red Chilli, Malabar Black Pepper, Cumin, Alleppey Cardamom, Coriander, Mustard, Fenugreek, Cinnamon, Cloves, Star Anise, Tamarind, Asafoetida, Bay Leaves |
| Pulses | Toor, Green Moong, Urid, Channa, Masoor, Rajma, Moth Beans, Horse Gram, Black Chana |
| FMCG | Branded food and provisions, Jaggery |
| Client-driven custom sourcing | Cotton textiles and garments, food-processing and agro machinery, stainless steel utensils and cookware, seasonal fresh fruits (mangoes), traditional sweets, coir and rubber door mats |

## Services

- **Export and shipping:** FOB, CIF, CFR and EXW Incoterms, shipped through Chennai Port (INMAA) and Kamarajar Port (Ennore).
- **Direct sourcing:** farm-gate and factory procurement from the producing regions:
  - Punjab and Haryana: basmati.
  - Andhra Pradesh and Telangana: chilli and turmeric.
  - Tamil Nadu: Salem turmeric, plus Tirupur textiles, Coimbatore machinery and Salem utensils.
  - Gujarat and Rajasthan: seed spices and pulses.
  - Kerala: pepper, cardamom and coir.
- **Multi-commodity custom sourcing:** textiles, machinery, utensils, fruits, sweets and mats made to client specifications.
- **Private label and OEM packaging:** custom artwork, BOPP pouches, non-woven zipper bags, jute sacks, multi-wall paper bags, vacuum-packed nitrogen sacks and barcoded master cartons.
- **Quality assurance:** optical Sortex grading and pre-shipment lab testing (SGS, Geo-Chem or a designated agency).
- **Export process:**
  1. RFQ, with a priced response within 24 hours.
  2. Grading and lab testing.
  3. Export packing.
  4. Port dispatch, customs clearance, phytosanitary fumigation and Bill of Lading.
- **Markets:** 35+ countries, including Australia (Melbourne, Sydney, Brisbane, Fremantle), New Zealand, the Middle East, Europe, Africa and the Americas.

## Website features

- Pages: home, about and sourcing, products, product detail, contact (RFQ form), privacy policy.
- **RFQ contact desk:** `POST /api/contact`.
  - Validated with zod.
  - Per-IP rate limit, a 100KB body cap, and honeypot and timing anti-spam checks.
  - Email delivery through SMTP.
- **SEO:** page metadata, `sitemap.xml` and `robots.txt`, and 301 redirects from the old `.html` and `sendmail.php` URLs.
- **Security:** CSP and other security headers set in [src/proxy.ts](src/proxy.ts).
- **Health check:** `/api/health`.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run build` | Production build (standalone output) |
| `npm start` | Run the standalone server |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm test` | API validation and security tests (needs a build first) |
| `npm run test:smoke` | Page, SEO and redirect smoke tests (needs a build first) |

### Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
|  `SMTP_HOST` (GoDaddy: `smtpout.secureserver.net`), `SMTP_USER`, `SMTP_PASS` | none | SMTP credentials for RFQ email |
| `SMTP_PORT` | `587` | SMTP port |
| `CONTACT_EMAIL` | `info@jayimpex.net` | Recipient of RFQ and brochure-request emails |
| `RFQ_EXTRA_RECIPIENTS` | senthilmargin@gmail.com, senthilmurugan@hotmail.com | Comma-separated extra recipients of every RFQ email |
| `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` | none | WhatsApp Business Cloud API credentials; RFQ alerts to WhatsApp are sent only when both are set |
| `WHATSAPP_TO`, `WHATSAPP_TEMPLATE`, `WHATSAPP_TEMPLATE_LANG` | 919444042275, none, en | Alert recipient and optional approved template (needed outside the 24-hour window) |
| `BROCHURE_TOKEN_SECRET` | derived from `SMTP_PASS` | Optional secret that signs brochure download links |

## Deployment

Docker multi-stage build (Node 22) deployed on Railway ([railway.json](railway.json)). CI in [.github/workflows/ci.yml](.github/workflows/ci.yml) runs lint, typecheck, build and both test suites.

## Documentation

Product requirements, backlog and implementation plan are in [docs/](docs/).

## Contact

Marginfree Super Market, 1739, 18th Main Road, Anna Nagar West, Chennai - 600040, Tamil Nadu, India
Phone: +91 94440 42275 · Email: info@jayimpex.net
