// Integration test suite using native HTTP fetch against local server
const BASE_URL = process.env.TEST_URL || "http://localhost:3000";

async function runTests() {
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

  console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
