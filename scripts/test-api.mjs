import { spawn } from "child_process";

// Integration test suite using native HTTP fetch against local server
const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function ensureServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (res.status === 200) return null;
  } catch {}

  console.log(`[SETUP] Spawning local standalone server at ${BASE_URL}...`);
  const server = spawn(process.execPath, [".next/standalone/server.js"], {
    stdio: "ignore",
    env: { ...process.env, ALLOW_EMAIL_SIMULATION: "true" },
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

async function runTests() {
  let serverProcess = null;
  try {
    serverProcess = await ensureServerRunning();
  } catch (err) {
    console.error("[SETUP ERROR]", err.message);
  }

  console.log(`=== JAY IMPEX API VALIDATION & SECURITY TEST SUITE ===`);
  console.log(`Target: ${BASE_URL}\n`);

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

  // 1. Health check test
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    assert(res.status === 200, "Health check returns HTTP 200");
    assert(data.status === "healthy", "Health check reports status: 'healthy'");
    assert(data.service === "jayimpex-web", "Health check reports service: 'jayimpex-web'");
  } catch (e) {
    console.error("Health check test threw:", e.message);
    failed++;
  }

  // 2. Valid RFQ Submission
  try {
    const validBody = {
      name: "Ahmed Al-Mansoor",
      company: "Gulf Food Importers LLC",
      email: "ahmed@gulffoods.example.com",
      phone: "+971 50 987 6543",
      country: "Jebel Ali Port, UAE",
      commodity: "Deity 1121 Steam Basmati Rice",
      volume: "2 x 20ft FCL",
      incoterm: "CIF",
      message: "Please quote CIF Jebel Ali for 50MT in 10kg BOPP bags with SGS inspection.",
      honeypot: "",
      renderTimestamp: Date.now() - 5000,
      consent: true,
    };
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.1",
      },
      body: JSON.stringify(validBody),
    });
    const data = await res.json();
    assert(res.status === 200, "Valid RFQ returns HTTP 200");
    assert(data.success === true, "Valid RFQ response has success: true");
  } catch (e) {
    console.error("Valid RFQ test threw:", e.message);
    failed++;
  }

  // 2b. Minimal RFQ (only name, email, commodity, message, consent)
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.9",
      },
      body: JSON.stringify({
        name: "Maria Lopez",
        email: "maria@importer.example.com",
        message: "Commodity: turmeric fingers. Please send FOB pricing for 5 MT.",
        renderTimestamp: Date.now() - 5000,
        consent: true,
      }),
    });
    const data = await res.json();
    assert(res.status === 200, "Minimal RFQ (optional fields omitted) returns HTTP 200");
    assert(/^JI-\d{8}-[0-9A-F]{6}$/.test(data.referenceId || ""), "RFQ response includes a reference number");
  } catch (e) {
    console.error("Minimal RFQ test threw:", e.message);
    failed++;
  }

  // 2c. Brochure download: details are submitted first, the PDF is only served with the issued token
  try {
    const post = (body, ip) =>
      fetch(`${BASE_URL}/api/brochure`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify(body),
      });
    const ok = { name: "Test Buyer", email: "buyer@example.com", company: "ACME", phone: "+971 50 123 4567", country: "UAE", consent: true, renderTimestamp: Date.now() - 5000 };
    const res = await post(ok, "203.0.113.20");
    const data = await res.json();
    assert(res.status === 200 && data.success === true, "Brochure request returns success");
    assert(typeof data.downloadUrl === "string" && data.downloadUrl.includes("token="), "Brochure request issues a download link");
    const pdf = await fetch(`${BASE_URL}${data.downloadUrl}`);
    const bytes = new Uint8Array(await pdf.arrayBuffer());
    assert(pdf.status === 200 && pdf.headers.get("content-type") === "application/pdf", "Valid token downloads the PDF");
    assert(String.fromCharCode(...bytes.slice(0, 4)) === "%PDF", "Downloaded file is a PDF");
    const noToken = await fetch(`${BASE_URL}/api/brochure/download`);
    assert(noToken.status === 403, "Download without a token is refused (403)");
    const forged = await fetch(`${BASE_URL}/api/brochure/download?token=${Date.now() + 600000}.forged`);
    assert(forged.status === 403, "Forged download token is refused (403)");
    const direct = await fetch(`${BASE_URL}/downloads/Jay_Impex_Export_Brochure.pdf`);
    assert(direct.status === 404, "PDF is not publicly reachable by direct URL");
    const noPhone = await post({ ...ok, phone: "" }, "203.0.113.24");
    assert(noPhone.status === 400, "Brochure request without phone returns 400");
    const noCompany = await post({ ...ok, company: "" }, "203.0.113.25");
    assert(noCompany.status === 400, "Brochure request without company returns 400");
    const noCountry = await post({ ...ok, country: "" }, "203.0.113.26");
    assert(noCountry.status === 400, "Brochure request without country returns 400");
    const badEmail = await post({ ...ok, email: "nope" }, "203.0.113.21");
    assert(badEmail.status === 400, "Brochure request with invalid email returns 400");
    const noConsent = await post({ ...ok, consent: false }, "203.0.113.22");
    assert(noConsent.status === 400, "Brochure request without consent returns 400");
    const bot = await (await post({ ...ok, honeypot: "x" }, "203.0.113.23")).json();
    assert(bot.success === true && !bot.downloadUrl, "Honeypot brochure request gets no download link");
  } catch (e) {
    console.error("Brochure test threw:", e.message);
    failed++;
  }

  // 3. Missing Required Field (Name missing)
  try {
    const invalidBody = {
      name: "",
      company: "Global Importers",
      email: "test@example.com",
      phone: "+1234567890",
      country: "Rotterdam",
      commodity: "Salem Pure Turmeric Fingers",
      message: "Please quote prices for whole turmeric fingers.",
      consent: true,
    };
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.2",
      },
      body: JSON.stringify(invalidBody),
    });
    const data = await res.json();
    assert(res.status === 400, "Missing name returns HTTP 400");
    assert(data.success === false, "Missing name response has success: false");
  } catch (e) {
    console.error("Missing field test threw:", e.message);
    failed++;
  }

  // 4. Invalid Email Format
  try {
    const badEmailBody = {
      name: "John Doe",
      company: "Trade Co",
      email: "invalid-email-string",
      phone: "+1234567890",
      country: "USA",
      commodity: "Indian Cumin Seeds (Jeera)",
      message: "Need 1 container of Singapore quality cumin seeds.",
      consent: true,
    };
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.3",
      },
      body: JSON.stringify(badEmailBody),
    });
    assert(res.status === 400, "Invalid email format returns HTTP 400");
  } catch (e) {
    console.error("Bad email test threw:", e.message);
    failed++;
  }

  // 5. Anti-Spam: Honeypot Trap
  try {
    const honeypotBody = {
      name: "Spammer Bot",
      company: "Spam LLC",
      email: "bot@spam.example.com",
      phone: "+1111111111",
      country: "Nowhere",
      commodity: "Deity 1121 Steam Basmati Rice",
      message: "Buy cheap meds now visit my website here.",
      honeypot: "http://spam-link.example.com",
      consent: true,
    };
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.4",
      },
      body: JSON.stringify(honeypotBody),
    });
    const data = await res.json();
    assert(res.status === 200, "Honeypot trap silently returns HTTP 200 to fool bot");
    assert(data.success === true, "Honeypot trap returns synthetic success");
  } catch (e) {
    console.error("Honeypot test threw:", e.message);
    failed++;
  }

  // 6. Anti-Spam: Fast Submission Timing (< 2.5 seconds)
  try {
    const fastBotBody = {
      name: "Automated Submitter",
      company: "Auto Corp",
      email: "fast@bot.example.com",
      phone: "+1234567890",
      country: "Nowhere",
      commodity: "Deity 1121 Steam Basmati Rice",
      message: "Fast automated post query.",
      renderTimestamp: Date.now() - 500, // 500ms ago (< 2500ms)
      consent: true,
    };
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.5",
      },
      body: JSON.stringify(fastBotBody),
    });
    const data = await res.json();
    assert(res.status === 200, "Fast submission (< 2.5s) silently returns HTTP 200 without email delivery");
    assert(data.success === true, "Fast submission returns synthetic success");
  } catch (e) {
    console.error("Fast submission test threw:", e.message);
    failed++;
  }

  // 7. Rate Limiting Protection (Max 5 requests per IP)
  try {
    const repeatedBody = {
      name: "Flooder",
      company: "Flood Corp",
      email: "flood@example.com",
      phone: "+9999999999",
      country: "London",
      commodity: "Deity 1121 Steam Basmati Rice",
      message: "Please quote prices for container shipments.",
      renderTimestamp: Date.now() - 5000,
      consent: true,
    };
    const floodIp = "192.0.2.99";
    for (let i = 0; i < 5; i++) {
      await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": floodIp,
        },
        body: JSON.stringify(repeatedBody),
      });
    }
    const rateLimitedRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": floodIp,
      },
      body: JSON.stringify(repeatedBody),
    });
    assert(rateLimitedRes.status === 429, "6th request within window returns HTTP 429 (Rate Limited)");
  } catch (e) {
    console.error("Rate limiting test threw:", e.message);
    failed++;
  }

  if (serverProcess) {
    console.log("[TEARDOWN] Stopping local test server...");
    serverProcess.kill();
  }

  console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
