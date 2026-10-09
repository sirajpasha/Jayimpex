# JayImpex Website Modernization — Product Requirements Document (PRD)

**Status:** Draft for stakeholder approval  
**Version:** 1.0  
**Date:** 10 October 2026  
**Product:** JayImpex public website  
**Prepared using:** Matt Pocock Skills — `to-spec` approach (repository inspection → user stories → implementation and testing decisions)  
**Source basis:** Attached JayImpex Git repository snapshot, including `index.html`, `home.html`, `about.html`, `products.html`, `contact.html`, `sendmail.php`, image assets, CSS, and README.  
**Important:** This document is a product/engineering specification, not a claim that the future system can be guaranteed vulnerability-free. Security must be continuously tested, monitored, and maintained.

---

## 1. Executive summary

JayImpex currently operates a static HTML website hosted through GitHub Pages/custom-domain configuration. The supplied repository contains separate pages for Home, About Us, Products, and Contact, with a parent page loading `home.html` inside an iframe. Product information and images are embedded in HTML, and the repository includes a legacy PHP mail handler as well as a contact form configured to submit to an external Formspree endpoint.

The goal is to modernize this into a maintainable, responsive, dynamic website using the latest stable, supported React ecosystem available at implementation time, deployed on Railway and delivered through the existing GitHub-based workflow. “Dynamic” means that reusable templates and structured content power the site, product lists and categories can be updated without hand-editing repeated page markup, and contact enquiries are processed through a secure server-side endpoint. It does **not** imply an online store, customer accounts, payment processing, or a full CMS unless separately approved.

The new website should preserve verified company/product information and useful existing URLs where practical, improve mobile usability and accessibility, support search-engine indexing, and introduce security controls from the first implementation. The public site should remain simple for visitors while the underlying code is testable, observable, and straightforward to maintain.

## 2. Problem statement

From a visitor’s perspective, JayImpex needs a credible and easy-to-use digital presence that explains its commodities/export offering and makes it straightforward to enquire about products.

From the owner’s perspective, maintaining static pages makes routine content changes manual and error-prone. The iframe-based page shell complicates navigation, page sizing, accessibility, analytics, and search-engine interpretation. The contact flow currently has multiple implementation traces (an external form endpoint and a legacy PHP mail script), making it unclear which is authoritative and how submissions are secured and operated.

The modernization should address those problems without inventing business claims, product specifications, certifications, customer logos, market coverage, or service promises that are not supported by the current source material.

## 3. Goals and measurable outcomes

### 3.1 Product goals

1. Replace the iframe-based static page composition with a React application using normal routes and shared layout components.
2. Make products and product categories data-driven, with a consistent product model and reusable product-card/detail presentation.
3. Provide a reliable, validated, spam-resistant contact/enquiry experience.
4. Preserve and improve the existing public information architecture and relevant search visibility.
5. Deploy reliably to Railway from GitHub with separate configuration for development and production.
6. Establish security and quality gates in CI and operational monitoring.
7. Make the site responsive, accessible, and performant on modern mobile and desktop browsers.

### 3.2 Success measures

These are target acceptance measures, not claims about current performance:

- All approved primary pages and product entries are available through first-party routes without iframe navigation.
- 100% of in-scope routes have a meaningful page title, description, canonical URL, and working navigation.
- Contact form tests cover valid submission, invalid fields, server errors, spam/rate limiting, and safe user feedback.
- No unresolved Critical or High severity findings from the agreed pre-launch security checks.
- Automated build, type/lint checks, unit tests, and end-to-end smoke tests pass in CI before production deployment.
- Lighthouse target on representative production pages: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95, subject to third-party embeds and measurement variability.
- WCAG 2.2 AA is the accessibility target for the public website.
- No broken internal links or missing local product images in the launch inventory.
- Contact enquiries are delivered to an owner-approved destination and the visitor sees an accurate success or failure state.

## 4. Non-goals for the initial release

Unless explicitly approved later, the first release will not include:

- Shopping cart, checkout, online payments, or customer self-service accounts.
- Inventory, order management, live stock levels, or product pricing.
- Customer relationship management (CRM) integration.
- A general-purpose visual CMS or public admin dashboard.
- Customer reviews, testimonials, certifications, statistics, or claims that have not been verified by JayImpex.
- Multilingual content beyond the language approved for launch.
- User-generated uploads or file attachments in the enquiry form.
- A guarantee of “zero vulnerabilities.” The requirement is to minimize risk, prevent known vulnerability classes, test continuously, and respond promptly to newly disclosed issues.

## 5. Current-state findings from the supplied repository

The following points are grounded in the attached source snapshot:

1. `index.html` provides the site shell and loads `home.html` in an iframe. It listens for a `message` event and sets iframe height based on a message’s `height` value. The listener checks a message type but does not visibly validate the sender origin or constrain the supplied height.
2. Navigation includes Home, About Us, Products, and Contact.
3. `home.html` presents exporter, wholesaler, and retailer messaging. The retailer copy references MarginFree SuperMarket and Chennai locations; these claims and brand relationships need owner confirmation before being retained.
4. `about.html` describes JayImpex’s commodity-trading/export experience and commitment to quality.
5. `products.html` includes product descriptions and variants for Deity-Basmati Rice, Rice, Turmeric Powder, Red Chilli Powder, Coriander Powder, Black Pepper Whole/Powder, Dhaniya, Red Chilli (all varieties), and Fenugreek Seeds. The repository also contains many product images for rice, pulses/dals, spices, seeds, and related items. The definitive launch catalogue must be reconciled against all content and assets.
6. `contact.html` includes an address/landmark, phone number, email address, opening hours, a contact form, Google Maps embed, and a WhatsApp link. These details must be confirmed before launch.
7. `contact.html` submits to a Formspree endpoint. `sendmail.php` also exists and constructs email headers using submitted email values. It applies HTML escaping, but output escaping alone is not an email-header validation strategy. The PHP file should not be carried forward as-is.
8. The source contains external resources such as Font Awesome and Google Maps. Third-party usage should be minimized and controlled.
9. `CNAME` contains `www.jayimpex.net`; the current custom-domain and DNS arrangement should be documented and migrated deliberately.
10. The README only identifies the repository as static webpages. There is no documented application architecture, automated test suite, or deployment/security runbook in the supplied snapshot.

These findings are not a full penetration test or a complete audit of the live website.

## 6. Users and jobs to be done

### Primary audiences

- **International buyer/importer:** Wants to understand the company’s export offering, review relevant commodities/variants, and send an enquiry.
- **Domestic wholesaler/distributor:** Wants to identify product categories and communicate requirements or volume/availability questions.
- **Retail or sourcing partner:** Wants to understand whether JayImpex is a suitable supplier and obtain current contact details.
- **Existing business contact:** Wants to find the correct phone, email, location, or WhatsApp contact quickly.
- **JayImpex site owner/content maintainer:** Wants to keep product content, images, contact details, and company copy consistent without editing several unrelated HTML files.

### User needs

- Quickly understand what JayImpex does.
- Browse products by category and recognize products through names, descriptions, and images.
- Know which information is confirmed and avoid misleading claims.
- Contact the company with a product-specific or general enquiry.
- Use the site with a keyboard, screen reader, mobile device, or slow connection.
- Trust that form details are transmitted and handled responsibly.

## 7. Information architecture and routes

Use a single React application with ordinary, direct-loadable routes. Exact slugs can be finalized during implementation, but the following route intent is required.

| Route | Purpose | Key content |
|---|---|---|
| `/` | Home | Company value proposition, concise business summary, featured categories, primary enquiry CTA |
| `/about` | About JayImpex | Verified company background, business model, sourcing/export approach |
| `/products` | Product catalogue | Product categories, product cards, search/filter if useful for the approved catalogue |
| `/products/:slug` | Product detail (optional in MVP if the owner approves) | Product description, variants/specifications only when verified, enquiry CTA |
| `/contact` | Contact/enquiry | Approved address, phone, email, opening hours, form, map link/embed, WhatsApp link |
| `/privacy` | Privacy notice | Data collected, purpose, retention, recipients/providers, contact for privacy requests |
| `/404` or route fallback | Not found | Helpful message and navigation back to catalogue/home |

### Navigation and URL behavior

- Shared header and footer appear consistently on every route.
- Active navigation is visually and programmatically identifiable.
- Browser back/forward, refresh, and direct links to nested routes work.
- Railway’s production routing must serve the React app correctly for direct route requests.
- Avoid the existing iframe pattern. Do not use cross-window `postMessage` for routine page composition.
- Where old URLs have meaningful traffic or external links, implement and test redirects. Do not redirect every unknown path to the home page.
- Keep `www.jayimpex.net` if the owner confirms it remains the canonical domain. Decide whether apex-to-www or www-to-apex is canonical and redirect the other consistently.

## 8. Functional requirements

Priority labels: **P0** = launch blocker; **P1** = important for initial release; **P2** = optional follow-up.

### FR-1. Shared layout and navigation — P0

- Build a reusable site shell with header, navigation, main content region, and footer.
- Navigation links must be real links and work without client-side JavaScript where the chosen rendering strategy allows.
- Mobile navigation must be keyboard-operable and have correct expanded/collapsed semantics.
- The page must not rely on an iframe to render core content.
- Display the approved JayImpex logo and brand name with accessible alternative text where appropriate.
- Footer should include only verified contact details, navigation links, and current copyright year.

**Acceptance criteria**
- Every in-scope route displays the same shared shell.
- Direct navigation and refresh on every route return the expected page.
- No iframe is used to embed the website’s own pages.
- Keyboard users can reach and operate all navigation controls.

### FR-2. Home page — P0

- Clearly state JayImpex’s verified business focus.
- Offer a primary CTA to browse products and a secondary CTA to contact the company.
- Surface selected product categories or products using the same source data as the catalogue.
- Use only existing, owner-approved imagery and copy.
- Do not publish unsupported claims such as “leading,” “premier,” years in business, export destinations, certifications, capacity, or guaranteed delivery unless confirmed by the owner.

**Acceptance criteria**
- Primary actions are visible on mobile and desktop.
- No placeholder, stale, or unapproved claims are published.
- Images are optimized, responsive, and have suitable alternative text.

### FR-3. About page — P0

- Present the company background and business approach using owner-verified copy.
- Explain export/commodity capabilities only to the level supported by confirmed information.
- Avoid adding fabricated history, awards, certifications, customer names, or scale metrics.

**Acceptance criteria**
- The page contains a unique title and description.
- All factual business claims have owner approval before production.

### FR-4. Product catalogue — P0

- Represent products in structured data rather than duplicating card markup across pages.
- Minimum seed catalogue should include the product families visible in the current site: Deity-Basmati Rice, Rice, Turmeric Powder, Red Chilli Powder, Coriander Powder, Black Pepper Whole/Powder, Dhaniya, Red Chilli (all varieties), and Fenugreek Seeds.
- Inventory all existing product-related assets and map each approved image to the correct product. The image directory also includes rice, pulses/dals, spices, and seed imagery; include these only if the owner confirms they are active offerings.
- Support product title, slug, short description, optional long description, category, image, image alt text, variant list, visibility status, and optional SEO metadata.
- Variants are display-only unless the owner supplies reliable specification data. Do not invent grades, origin, packaging, minimum order quantity, price, certifications, or availability.
- Provide an enquiry CTA from the catalogue and optionally prefill the selected product in the contact form.
- Search/filter by name/category is P1 if the final catalogue is large enough to justify it.

**Acceptance criteria**
- Product cards are rendered from structured data.
- Missing optional fields do not break page rendering.
- Hidden/draft products are not exposed publicly.
- Every visible product image resolves or uses an intentional fallback.
- Product names and variants match owner-approved source content.

### FR-5. Product detail pages — P1 (decision required)

- If approved, each product receives a stable, shareable URL and unique SEO metadata.
- The page displays only confirmed details and has a clear enquiry action.
- Unknown or unpublished product slugs return a proper not-found response/state.
- Product details and catalogue cards share the same data source.

### FR-6. Contact information — P0

The current page lists Marginfree Super Market, 1739, 18th Main Road, Anna Nagar West, Chennai – 600040, Tamil Nadu, India; phone `+91 94440 42275`; email `info@jayimpex.com`; and hours Monday–Saturday, 10:00 AM–10:00 PM. These are **unverified source values** and must be confirmed by the owner before launch.

- Contact details must be maintained in one configuration/content source.
- Phone, email, WhatsApp, and map links must be clickable and valid.
- Do not expose private staff contact details unless the owner explicitly approves publication.
- If a map is included, provide a normal map link as a fallback and consider click-to-load to reduce third-party tracking and page weight.

**Acceptance criteria**
- All contact details are owner-approved.
- The page works when a map provider or external embed is blocked.
- The contact information is consistent across header/footer/contact page.

### FR-7. Contact enquiry form — P0

Required fields:
- Name (required)
- Email address (required)
- Message (required)

Optional:
- Phone number

Recommended additions:
- Product of interest (optional select based on approved catalogue)
- Privacy notice link and concise statement explaining that submitted information is used to respond to the enquiry

Behavior:
- Client-side validation improves usability, but all validation must be repeated on the server.
- Display field-specific validation errors and preserve valid user input after recoverable errors.
- On successful server acceptance, show a clear confirmation; do not claim that the company has replied or that email delivery is guaranteed.
- On failure, show a helpful generic error and safe retry path without revealing server internals.
- Send enquiries only to a destination configured through Railway environment variables or an approved email provider.
- Use a maintained email delivery provider or a secure server-side integration. Do not rely on the legacy PHP `mail()` implementation.
- Do not put secrets, provider API keys, or recipient-routing credentials in React/client-side code.
- Avoid storing message bodies in application logs. If persistence is required, obtain approval for the data model, access controls, retention, and deletion process.

**Acceptance criteria**
- Valid submissions are accepted and routed to the configured recipient/provider.
- Invalid, oversized, malformed, and empty submissions are rejected server-side.
- Double-clicks/retries do not create uncontrolled duplicate submissions where idempotency can reasonably be applied.
- Rate limits and spam controls operate server-side.
- The response accurately distinguishes accepted submissions from failures.
- No secrets or submitted message content appear in routine logs.

### FR-8. Privacy notice — P0

- Explain what information the form collects and why.
- Name the responsible business/contact and provide a privacy contact route.
- Describe email/hosting providers that process submitted data, retention policy, and how a person can request correction/deletion where applicable.
- The owner/legal adviser must approve the notice and determine applicable privacy obligations for the company’s markets.
- Do not claim legal compliance solely because a notice exists.

### FR-9. SEO and shareability — P0

- Unique title and meta description per route.
- Canonical URLs for indexable routes.
- Open Graph/social metadata with approved logo/imagery.
- XML sitemap and robots directives appropriate for production.
- Structured data only where accurate and supported (for example, organization/contact data if confirmed).
- Semantic headings and descriptive links.
- Redirect policy for existing URLs, verified against live analytics/search data if available.
- Avoid indexing staging deployments or private preview routes.

**Acceptance criteria**
- Sitemap includes only canonical, public routes.
- No staging URL is declared canonical.
- Automated link/metadata smoke checks pass.

### FR-10. Accessibility and responsive behavior — P0

- Target WCAG 2.2 AA.
- Semantic landmarks, logical heading order, visible focus, keyboard navigation, accessible form labels/errors, adequate contrast, and meaningful image alternatives.
- Respect reduced-motion preferences.
- Avoid communicating status by color alone.
- Test representative small mobile, tablet, and desktop viewports.
- Third-party embeds must not trap keyboard focus or be required to complete key tasks.

**Acceptance criteria**
- Automated accessibility checks pass at the agreed threshold.
- Critical flows are manually keyboard-tested.
- Contact form can be completed with a screen reader/keyboard without relying on placeholder-only labels.

### FR-11. Content maintenance — P1

For the initial release, structured data can live in version-controlled JSON/TypeScript data files. This provides dynamic rendering and a clear source of truth without introducing an admin service. Changes are made through a reviewed Git pull request.

A CMS/admin interface is a separate product decision. If needed later, it must include authentication, authorization, audit history, input validation, secure media handling, and a defined publishing workflow.

### FR-12. Analytics and consent — P1

- Decide whether analytics are required and which provider is acceptable.
- Collect only necessary data and avoid logging form message contents or personal data in analytics.
- If cookies or tracking technologies requiring consent are used, implement an appropriate consent experience for the applicable jurisdictions.
- Do not add third-party trackers by default.

## 9. Recommended technical architecture

### 9.1 Frontend and rendering

- Use the latest **stable and supported** React version available when implementation begins, not a prerelease/canary build.
- Use TypeScript with strict type checking.
- Prefer a React framework with server-side rendering or static generation support, such as a maintained React framework compatible with Railway. Select the framework based on SEO, deployment simplicity, and maintenance requirements; document the choice before implementation.
- Use server rendering/static generation for public content where practical so search engines and users receive meaningful HTML quickly.
- Use a maintained routing system; avoid hand-built routing and iframe composition.
- Keep components small in number but deep in behavior: shared page shell, product catalogue/data access, and contact submission should each expose clear interfaces.
- Use a lockfile and reproducible package installation.
- Use current supported Node.js LTS at implementation time, compatible with the chosen framework.

### 9.2 Server/API

- Add a server-side contact submission endpoint in the same application/deployment where practical.
- Use a schema validation library with explicit maximum lengths and field formats.
- Keep business logic behind a narrow contact-submission service interface so the delivery provider can be replaced without rewriting the form.
- Apply request body limits, rate limiting, generic error responses, and safe logging.
- No database is required for the MVP unless the owner explicitly wants enquiry history, product administration, or other persistence.
- If enquiry persistence is later required, use a managed database with least-privilege credentials, encrypted transport, migrations, backup/retention policy, and restricted access.

### 9.3 Content model

Recommended conceptual model:

- **Product**: stable ID, slug, name, category ID, short description, optional detailed description, optional image reference/alt text, variants, publication status, optional SEO fields.
- **Category**: stable ID, slug, name, description, display order, publication status.
- **ContactSettings**: approved phone, email, address, business hours, WhatsApp URL, map URL.
- **SiteSettings**: site name, canonical origin, logo asset, social metadata.
- **Enquiry** (transient by default): name, email, optional phone, message, optional product reference, submission timestamp, processing status only if persistence is explicitly approved.

Validate product data in tests or at build time so invalid slugs, missing required fields, and broken image references are detected before deployment.

### 9.4 Deployment

- GitHub remains the source repository and review workflow.
- Railway builds and deploys from the designated production branch.
- Use separate production and preview/staging environments where supported and affordable.
- Configure the custom domain and TLS in Railway/DNS deliberately; verify DNS and certificate issuance before cutover.
- Set environment variables through Railway’s environment management, not committed files.
- Use a production start command and health check suitable for the chosen framework.
- Configure the SPA/framework fallback only as appropriate to the selected framework; preserve real 404 behavior.
- Ensure the process binds to the host/port supplied by Railway.
- Roll back to the last known-good deployment if health checks or smoke tests fail.
- Do not commit `.env` files, credentials, provider keys, or production data.

## 10. Security requirements and threat model

The objective is a **secure-by-default, continuously tested system**, not an absolute promise that no vulnerability will ever exist.

### 10.1 Security principles

1. Minimize attack surface and third-party dependencies.
2. Validate all untrusted input at the server boundary.
3. Encode output according to its destination; do not treat input escaping as a universal defense.
4. Use least privilege for deployment credentials, email providers, and any future database.
5. Keep secrets server-side and rotate them if exposure is suspected.
6. Fail safely with generic public errors and detailed but privacy-safe operational telemetry.
7. Patch supported dependencies promptly based on severity and exploitability.
8. Do not ship features that cannot be adequately tested or operated.

### 10.2 Mandatory controls

**Application and dependency security**
- TypeScript strict mode and linting.
- Dependency lockfile and reproducible CI installation.
- Automated dependency vulnerability scanning in CI and ongoing alerts.
- Review new dependencies for maintenance, ownership, transitive dependencies, and necessity.
- Keep framework/runtime dependencies on supported releases and establish a patching SLA.
- Protect against XSS by using normal React text rendering; prohibit unsafe HTML rendering unless a reviewed, maintained sanitizer and explicit need are documented.
- Do not build SQL queries with string concatenation if a database is added.
- Avoid dynamic code evaluation and unsafe deserialization.

**Contact form and API**
- Server-side schema validation and explicit size limits.
- Rate limiting by a trustworthy client identity/IP strategy appropriate to Railway/proxy headers; do not blindly trust arbitrary forwarded headers.
- Spam prevention with a layered approach: honeypot and timing checks first; add a privacy-reviewed CAPTCHA/turnstile only if abuse warrants it.
- Prevent email header injection: never derive `From` or arbitrary headers directly from user input. Use a fixed verified sender identity and place the user’s address in a validated Reply-To field only if supported by the provider.
- Avoid open redirects, arbitrary URL fetches, and user-controlled outbound destinations.
- Restrict CORS to known origins if cross-origin API access is needed; same-origin is preferred.
- Return appropriate status codes and never expose stack traces, credentials, provider errors, or environment values.
- Add CSRF protection if cookie-authenticated state-changing requests are introduced; for a same-origin stateless form, document the chosen abuse/CSRF posture and controls.
- Do not accept file uploads in MVP.

**HTTP and browser protections**
- HTTPS only in production.
- Configure security headers: Content-Security-Policy (CSP), `X-Content-Type-Options: nosniff`, an appropriate `Referrer-Policy`, `Permissions-Policy`, and frame-ancestors protection via CSP.
- Use HSTS only once HTTPS and domain coverage are confirmed, with a rollout that avoids locking out an unprepared domain.
- Set CSP directives narrowly; explicitly account for any approved map, email, font, or analytics provider. Avoid broad `*` sources and `unsafe-eval`; treat `unsafe-inline` as a temporary exception requiring a documented justification if unavoidable.
- No self-embedding iframe is needed. If any external iframe remains, restrict it using sandbox/allow attributes and CSP.
- Use secure, HttpOnly, SameSite cookies if cookies are introduced; do not add sessions without a need.
- Avoid loading unnecessary third-party scripts. Self-host assets where licensing and maintenance permit.

**Secrets and infrastructure**
- Store secrets in Railway environment variables or an approved secret manager.
- Use different credentials for staging and production.
- Limit GitHub/Railway access to required maintainers; enable MFA on owner/admin accounts.
- Protect the production branch with pull requests and required CI checks.
- Review Git history for accidental secrets before migration; rotate any exposed credentials rather than only deleting them.
- Do not publish source maps if they expose sensitive source/configuration; if published for error tracking, control access and verify no secrets are embedded.
- Restrict database/service credentials to the exact required operations if future services are added.

**Privacy and observability**
- Redact email addresses, phone numbers, and message content from routine logs.
- Do not log environment variables or complete request bodies.
- Define log retention and access.
- Monitor availability, server errors, form delivery failures, and dependency alerts.
- Document incident triage, secret rotation, and rollback.

### 10.3 Security acceptance gates

Production launch is blocked unless:

- No unresolved Critical or High severity vulnerabilities are present in the agreed dependency/security scans, or an explicit written risk acceptance is approved by the owner.
- No secrets are found in the shipped client bundle or repository scan.
- The contact endpoint rejects malformed/oversized input and enforces rate limits.
- Security headers are present and verified on production responses.
- CSP is tested against all approved page features and does not require unrestricted script execution.
- Form submissions cannot set arbitrary email headers or choose arbitrary recipients.
- Error responses do not expose stack traces or secrets.
- A basic OWASP-aligned web security review and automated dynamic scan have been completed.
- The domain serves valid HTTPS and redirects to the chosen canonical host.
- The team has a documented process for dependency updates and security incident response.

## 11. Performance and reliability requirements

- Optimize images to modern formats where practical, with responsive sizes and explicit dimensions to reduce layout shifts.
- Lazy-load below-the-fold images and third-party embeds.
- Load only the JavaScript needed for the current page.
- Avoid unnecessary animation and heavy third-party libraries.
- Use caching appropriate to public static content while keeping contact/API responses non-cacheable where appropriate.
- Provide a graceful error state if an optional external map or email provider is unavailable.
- Add a health endpoint/check that does not leak environment or infrastructure details.
- The contact form must time out safely and tell the visitor how to retry.
- Establish basic uptime and server-error monitoring for production.

## 12. SEO, content, and migration plan

### Content inventory and approval
1. Inventory all public copy, product names, variants, image assets, contact details, and external links.
2. Create a product/content spreadsheet or equivalent source-controlled inventory.
3. Ask the owner to approve product availability, variants, imagery, business claims, address, phone, email, hours, map, and WhatsApp destination.
4. Mark uncertain claims as unpublished rather than silently rewriting them.
5. Remove obsolete/duplicate pages from public navigation after redirects are confirmed.

### URL and domain migration
1. Record existing deployed URLs and any available search analytics.
2. Define canonical domain and redirect rules.
3. Preserve relevant URLs where possible; otherwise implement one-to-one permanent redirects.
4. Test internal links, redirects, sitemap, robots rules, canonical tags, and 404 behavior.
5. Deploy to a Railway staging URL and verify the full site before changing DNS.
6. Cut over DNS/domain only after production environment variables, TLS, email routing, and smoke tests are ready.
7. Monitor 404s, traffic, contact delivery, and server errors after launch.

### Legacy behavior to retire
- Remove the iframe shell and its wildcard `postMessage` height mechanism.
- Do not deploy the legacy `sendmail.php` endpoint.
- Choose one authoritative contact submission route and retire the duplicate/unused route.
- Remove unneeded CSS, JavaScript, and third-party resources after confirming they are not used by approved content.
- Do not blindly copy old markup or scripts into the React app.

## 13. Testing strategy

Tests should verify observable behavior and security boundaries, not private implementation details.

### Unit and schema tests
- Product/category data validation, unique slugs, publication filtering, optional fields, and image references.
- Contact input validation, length limits, malformed email handling, and normalization.
- Error mapping from the contact delivery service to safe user-facing messages.
- Canonical URL/metadata helpers where applicable.

### Component/integration tests
- Navigation and responsive menu behavior.
- Product listing rendering, filtering/search if included, empty state, and unknown product behavior.
- Contact form validation and success/failure states.
- Server endpoint validation, rate limiting, provider failures, and safe logging.
- Security headers and cache behavior.

### End-to-end tests
- Open every route directly, refresh, navigate backward/forward, and confirm no iframe-based page shell.
- Browse products and follow an enquiry CTA.
- Submit valid contact details against a test provider/mock, then test invalid and oversized requests.
- Verify mobile navigation and keyboard-only contact form completion.
- Verify links for phone, email, WhatsApp, map, privacy notice, and redirects.
- Verify unknown routes return the expected not-found experience.

### Security and operational checks
- Dependency and secret scanning in CI.
- Static analysis/lint/type checks.
- Automated accessibility scan plus manual keyboard checks.
- Dynamic application scan against staging.
- Manual review of CSP, security headers, rate limiting, error handling, email-header handling, and proxy/IP assumptions.
- Railway deployment smoke test and rollback rehearsal before launch.

### CI required checks
- Clean lockfile install.
- Type check.
- Lint/format check.
- Unit and integration tests.
- Production build.
- Dependency and secret scan.
- End-to-end smoke tests for the release candidate where infrastructure permits.

## 14. Suggested delivery phases

### Phase 0 — Confirm scope and source-of-truth content
- Confirm company claims, product catalogue, product images, contact details, domain ownership, email provider, and privacy requirements.
- Decide whether product detail pages, search/filter, analytics, and CMS are MVP requirements.
- Record architecture decisions and threat model.

### Phase 1 — Foundation
- Initialize the React/TypeScript application and selected framework.
- Configure shared layout, routing, design tokens, linting, tests, and CI.
- Configure Railway staging and secure environment variable handling.
- Establish baseline security headers and dependency scanning.

### Phase 2 — Public pages and structured catalogue
- Build Home, About, Products, and Contact pages.
- Import approved content and image mappings.
- Add SEO metadata, sitemap, redirects, responsive behavior, and accessibility support.

### Phase 3 — Secure contact delivery
- Implement server-side contact endpoint, validation, rate limiting, spam controls, and email-provider adapter.
- Add privacy notice and safe user feedback.
- Test delivery failure, provider timeout, duplicate submissions, and logs.

### Phase 4 — Verification and migration
- Complete content sign-off, functional tests, accessibility review, security review, performance checks, and route/redirect tests.
- Deploy staging candidate and test with the owner.
- Perform production DNS/domain cutover, smoke tests, monitoring, and rollback readiness.

### Phase 5 — Optional improvements
- CMS/admin content editing.
- Product detail pages and richer product filtering.
- Enquiry persistence/CRM integration.
- Analytics, multilingual content, and other enhancements after business need is established.

## 15. User stories

### Visitor and buyer experience
1. As a prospective importer, I want to understand JayImpex’s business focus from the home page so that I can decide whether to explore further.
2. As a visitor, I want consistent navigation so that I can move between Home, About, Products, and Contact.
3. As a visitor, I want each page to have a direct URL so that I can bookmark or share it.
4. As a visitor, I want the site to work when I refresh a page or use browser back/forward so that navigation behaves as expected.
5. As a buyer, I want to browse product categories so that I can find relevant commodities quickly.
6. As a buyer, I want product names and images to be accurate so that I can identify what JayImpex offers.
7. As a buyer, I want to see available product variants where confirmed so that I can describe my requirements precisely.
8. As a buyer, I want to enquire about a particular product so that the company understands the context of my request.
9. As a wholesaler, I want to find approved contact details quickly so that I can discuss requirements directly.
10. As an international buyer, I want the website to work on mobile and desktop so that I can use it from different devices.
11. As a visitor, I want meaningful loading and error states so that I understand what is happening when a service is slow or unavailable.
12. As a visitor, I want the map to be optional so that I can still find contact information if the map provider is blocked.
13. As a visitor, I want clear and honest company information so that I am not misled by unsupported claims.
14. As a visitor using assistive technology, I want semantic structure and labels so that I can understand and operate the site.
15. As a keyboard user, I want visible focus and operable controls so that I can complete tasks without a mouse.
16. As a visitor, I want links to phone, email, WhatsApp, and maps to work on supported devices so that I can choose my preferred contact method.

### Contact and enquiry
17. As a prospective customer, I want to submit my name, email, and message so that JayImpex can respond.
18. As a prospective customer, I want phone number to be optional so that I can enquire without sharing unnecessary information.
19. As a customer, I want field-specific validation messages so that I can correct mistakes.
20. As a customer, I want my entered details preserved after a recoverable server failure so that I do not need to retype the enquiry.
21. As a customer, I want a clear confirmation after the server accepts my enquiry so that I know the request was received for processing.
22. As a customer, I want a safe error message if delivery fails so that I know I may need to retry.
23. As the site owner, I want enquiries sent to a configured recipient so that I can change the destination without changing frontend code.
24. As the site owner, I want spam and abusive submissions rate-limited so that the contact channel remains usable.
25. As the site owner, I want invalid email headers and arbitrary recipient values rejected so that the form cannot be used to abuse the mail system.
26. As the site owner, I want routine logs to omit message content and secrets so that personal data exposure is minimized.
27. As a person submitting an enquiry, I want a privacy notice so that I understand how my information will be used.
28. As the site owner, I want provider failures and delivery issues observable so that I can troubleshoot without exposing customer data.

### Content management and operations
29. As the site owner, I want product content in a single structured source so that names, descriptions, and variants remain consistent.
30. As a maintainer, I want product records validated before deployment so that malformed content does not break the catalogue.
31. As a maintainer, I want image references checked in CI so that broken images are caught before release.
32. As a maintainer, I want content changes reviewed through Git so that updates are traceable and reversible.
33. As the owner, I want the production deployment to be triggered by a reviewed Git change so that unreviewed changes do not go live.
34. As an operator, I want a health check and smoke tests so that failed deployments are detected promptly.
35. As an operator, I want rollback instructions so that I can restore the last known-good deployment.
36. As an operator, I want separate staging and production configuration so that testing does not affect live customers.
37. As a maintainer, I want dependencies scanned and patched so that known vulnerable packages do not remain unnoticed.
38. As an owner, I want domain and TLS status verified before launch so that visitors reach the canonical secure site.

### SEO, quality, and security
39. As a visitor arriving from a search engine, I want a descriptive search result so that I can judge page relevance before opening it.
40. As a search engine, I want canonical metadata and a sitemap so that I can discover and index the intended public pages.
41. As a site owner, I want legacy URLs redirected appropriately so that existing links remain useful.
42. As a maintainer, I want automated tests for core journeys so that changes do not silently break contact or navigation.
43. As a site owner, I want no unresolved Critical or High security findings at launch unless formally accepted so that known serious risks are not ignored.
44. As a maintainer, I want browser security headers configured so that common client-side attack paths are constrained.
45. As an operator, I want secrets stored outside source control and client bundles so that deployment credentials are not publicly exposed.
46. As a site owner, I want minimal third-party scripts so that the attack surface, tracking, and page weight are reduced.
47. As a maintainer, I want an incident-response and dependency-patching process so that security remains an ongoing responsibility after launch.

## 16. Implementation decisions and open decisions

### Proposed decisions
- React + TypeScript, latest stable supported releases at implementation time.
- A maintained React framework with server rendering/static generation where practical, selected and documented before implementation.
- Railway as application hosting and GitHub as source control/CI entry point.
- Structured version-controlled content for MVP; no CMS by default.
- Same-origin server endpoint for contact submissions.
- No database unless an approved feature requires persistence.
- No user accounts, checkout, or payments in MVP.
- No legacy PHP mail endpoint carried into production.
- Security and accessibility checks are release gates, not optional cleanup.

### Owner decisions required before production
1. Confirm the official company description and whether exporter, wholesaler, and retailer messaging all apply to JayImpex today.
2. Approve the definitive product catalogue and which image assets correspond to active products.
3. Confirm all product variants, product origins, export destinations, and any claims about quality or processing.
4. Confirm official address, phone, email, business hours, WhatsApp link, and map location.
5. Confirm which email/provider should receive contact submissions and who owns its credentials.
6. Confirm canonical domain and DNS access for `www.jayimpex.net`.
7. Decide whether product detail pages and product search/filter are required for the first release.
8. Decide whether content updates through reviewed Git pull requests are sufficient or whether a CMS is required.
9. Approve privacy notice, data retention, and analytics/consent decisions.
10. Approve the initial brand/design direction and any visual references.
11. Define who receives production security alerts and who can approve a documented risk exception.

## 17. Definition of done

The project is ready for launch when all of the following are true:

- Approved content and product inventory are published.
- Home, About, Products, and Contact are implemented as React routes with shared layout.
- All routes work on direct load, refresh, and browser navigation.
- Contact submission is handled server-side with validation, rate limiting, spam controls, and configured email delivery.
- Privacy notice is approved and available.
- Existing useful URLs and canonical domain behavior are tested.
- Responsive, accessibility, SEO, and performance acceptance checks are completed.
- CI passes type checks, lint, tests, production build, dependency scan, and secret scan.
- Staging dynamic scan and manual security review have no unresolved Critical/High findings, subject to documented risk acceptance.
- Production HTTPS, security headers, health checks, monitoring, and rollback instructions are verified.
- No production secret is committed or included in the client bundle.
- The owner has tested the staging site and signed off on content and contact delivery.

## 18. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Existing content is outdated or inconsistent | Incorrect business claims or customer confusion | Owner sign-off and content inventory before launch |
| Product assets do not map cleanly to product records | Wrong product images | Explicit image mapping and CI asset checks |
| Contact provider configuration is missing or incorrect | Lost enquiries | Test provider in staging; production delivery smoke test and monitoring |
| Legacy PHP handler is reused | Email-header abuse or unsafe processing | Retire it; implement validated server-side delivery |
| DNS/canonical domain cutover is rushed | Downtime or SEO loss | Stage first, verify TLS, redirects, and rollback |
| Third-party maps/fonts/scripts expand risk or slow pages | Performance/privacy/security impact | Minimize dependencies, CSP allowlist, lazy-load embeds |
| “No vulnerabilities” interpreted as an absolute guarantee | False assurance | Use measurable security gates and ongoing patching/monitoring |
| CMS added prematurely | Increased complexity and attack surface | Start with version-controlled content; reassess only when needed |
| Email deliverability is assumed rather than tested | Missed customer enquiries | Use an approved provider, verified sender domain, and delivery monitoring |

## 19. References and source boundaries

### Repository-derived
- `README.md`: identifies the project as static webpages.
- `index.html`: iframe page shell, primary navigation, and `postMessage` height behavior.
- `home.html`: exporter, wholesaler, and retailer messaging.
- `about.html`: company/export overview.
- `products.html`: current product copy and variants.
- `contact.html`: contact details, Formspree form, map embed, and WhatsApp link.
- `sendmail.php`: legacy PHP email handling.
- `images/`: product, company, and category imagery.
- `CNAME`: `www.jayimpex.net`.

### External verification still required
This PRD intentionally does not assert that a specific React version, Railway feature, email provider, privacy-law interpretation, or security scanner is current or correctly configured. Before implementation, verify current official documentation for the selected React framework, Node.js support, Railway deployment and domain setup, email provider security, and applicable privacy obligations. Record exact supported versions and configuration in the implementation repository.

---

**Recommended next step:** approve the open decisions in Section 16, then convert this PRD into dependency-aware implementation tickets (foundation/CI → shared layout/routes → content model/catalogue → contact endpoint → SEO/accessibility/security verification → production cutover).
