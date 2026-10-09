import { spawn } from "child_process";

// Automated E2E Smoke & Quality Verification Suite for Jay Impex Modernization
const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function ensureServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (res.status === 200) return null;
  } catch {}

  console.log(`[SETUP] Spawning local standalone server at ${BASE_URL}...`);
  const server = spawn(process.execPath, [".next/standalone/server.js"], {
    stdio: "ignore",
    detached: false,
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (res.status === 200) {
        console.log(`[SETUP] Local standalone server ready.\n`);
        return server;
      }
    } catch {}
  }
  throw new Error("Failed to start local standalone server within 6s");
}

async function runSmokeTests() {
  let serverProcess = null;
  try {
    serverProcess = await ensureServerRunning();
  } catch (err) {
    console.error("[SETUP ERROR]", err.message);
  }

  console.log("=== JAY IMPEX END-TO-END SMOKE & QUALITY AUDIT ===");
  console.log(`Auditing Host: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // --- 1. CORE ROUTE AVAILABILITY (HTTP 200) ---
  const routesToTest = [
    { path: "/", title: "Home Page" },
    { path: "/about", title: "About Us & Sourcing" },
    { path: "/products", title: "Export Catalogue" },
    { path: "/products/deity-1121-steam-basmati-rice", title: "Product Detail (Deity 1121)" },
    { path: "/products/salem-turmeric-finger-and-powder", title: "Product Detail (Salem Turmeric)" },
    { path: "/products/toor-dhal-split-pigeon-peas", title: "Product Detail (Toor Dhal)" },
    { path: "/contact", title: "Commercial Desk & RFQ" },
    { path: "/privacy", title: "Privacy Notice" },
    { path: "/api/health", title: "Health Check API" },
  ];

  for (const route of routesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      assert(res.status === 200, `Route '${route.path}' (${route.title}) returns HTTP 200`);
    } catch (e) {
      console.error(`Route '${route.path}' threw:`, e.message);
      failed++;
    }
  }

  // --- 2. LEGACY URL 301 REDIRECTS ---
  const legacyRedirects = [
    { from: "/index.html", expected: "/" },
    { from: "/home.html", expected: "/" },
    { from: "/products.html", expected: "/products" },
    { from: "/about.html", expected: "/about" },
    { from: "/contact.html", expected: "/contact" },
    { from: "/sendmail.php", expected: "/contact" },
  ];

  for (const redir of legacyRedirects) {
    try {
      const res = await fetch(`${BASE_URL}${redir.from}`, { redirect: "manual" });
      const isRedirect = res.status === 301 || res.status === 307 || res.status === 308;
      const location = res.headers.get("location");
      assert(
        isRedirect && (location === redir.expected || location?.endsWith(redir.expected)),
        `Legacy URL '${redir.from}' redirects (HTTP ${res.status}) to '${redir.expected}'`
      );
    } catch (e) {
      console.error(`Redirect for '${redir.from}' threw:`, e.message);
      failed++;
    }
  }

  // --- 3. SEO ARTIFACTS: SITEMAP & ROBOTS ---
  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    assert(sitemapRes.status === 200, "Sitemap '/sitemap.xml' returns HTTP 200");
    assert(sitemapText.includes("<urlset") || sitemapText.includes("<?xml"), "Sitemap contains valid XML urlset");
    assert(sitemapText.includes("https://www.jayimpex.net"), "Sitemap includes canonical domain");
    assert(sitemapText.includes("/products/deity-1121-steam-basmati-rice"), "Sitemap indexes dynamic commodity URLs");
  } catch (e) {
    console.error("Sitemap test threw:", e.message);
    failed++;
  }

  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    assert(robotsRes.status === 200, "Robots '/robots.txt' returns HTTP 200");
    assert(robotsText.includes("User-agent: *") || robotsText.includes("User-Agent: *"), "Robots.txt defines universal agent rule");
    assert(robotsText.includes("Disallow: /api/"), "Robots.txt disallows internal API routes");
    assert(robotsText.includes("sitemap.xml"), "Robots.txt points to sitemap");
  } catch (e) {
    console.error("Robots test threw:", e.message);
    failed++;
  }

  // --- 4. SECURITY HEADERS AUDIT ---
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const xFrame = homeRes.headers.get("x-frame-options");
    const xContent = homeRes.headers.get("x-content-type-options");
    const csp = homeRes.headers.get("content-security-policy");
    const hsts = homeRes.headers.get("strict-transport-security");
    const referrer = homeRes.headers.get("referrer-policy");

    assert(xFrame === "DENY", "X-Frame-Options is strictly set to DENY (Zero iframe embed)");
    assert(xContent === "nosniff", "X-Content-Type-Options is set to nosniff");
    assert(csp !== null && csp.length > 20, "Content-Security-Policy header is active and configured");
    assert(hsts !== null && hsts.includes("max-age"), "Strict-Transport-Security (HSTS) header is active");
    assert(referrer === "strict-origin-when-cross-origin", "Referrer-Policy is set to strict-origin-when-cross-origin");
  } catch (e) {
    console.error("Security headers audit threw:", e.message);
    failed++;
  }

  // --- 5. ACCESSIBILITY & SEMANTIC HTML INTEGRITY ---
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const html = await homeRes.text();

    assert(html.includes('id="main-content"'), "Primary content landmark <main id='main-content'> present");
    assert(html.includes('href="#main-content"'), "Accessible skip navigation link present");
    assert(html.includes("<title>"), "Page title tag populated");
    assert(html.includes('name="description"'), "Meta description tag present");
    assert(html.includes('property="og:title"'), "OpenGraph og:title metadata card present");
  } catch (e) {
    console.error("HTML semantics audit threw:", e.message);
    failed++;
  }

  if (serverProcess) {
    console.log("[TEARDOWN] Stopping local test server...");
    serverProcess.kill();
  }

  console.log(`\n=================================================`);
  console.log(`Smoke & Quality Verification: ${passed} Passed, ${failed} Failed.`);
  console.log(`=================================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests();
