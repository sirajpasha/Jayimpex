import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import { issueBrochureToken } from "@/lib/brochure-token";

// Simple in-memory rate limit (single replica): 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) return true;
  record.count += 1;
  return false;
}

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(120),
  company: z.string().trim().min(2, "Please enter your company name").max(120),
  phone: z.string().trim().min(6, "Please provide a valid phone / WhatsApp number").max(30),
  country: z.string().trim().min(2, "Please enter your country").max(100),
  honeypot: z.string().optional().default(""),
  renderTimestamp: z.number().optional().default(0),
  consent: z.boolean().refine((v) => v === true, "Privacy consent is required"),
});

const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
const oneLine = (v: string) => v.replace(/[\r\n]/g, " ").trim();

export async function POST(request: NextRequest) {
  try {
    if (parseInt(request.headers.get("content-length") || "0", 10) > 20480) {
      return NextResponse.json({ success: false, error: "Payload too large." }, { status: 413 });
    }
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a few minutes or contact us directly." },
        { status: 429 }
      );
    }

    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid details." },
        { status: 400 }
      );
    }
    const d = parsed.data;

    // Anti-spam: honeypot and too-fast submissions get a success response without a download link
    if (d.honeypot.trim() !== "" || (d.renderTimestamp > 0 && Date.now() - d.renderTimestamp < 1500)) {
      console.warn("[BROCHURE_SPAM_DROPPED]");
      return NextResponse.json({ success: true, message: "Thank you." }, { status: 200 });
    }

    const ref = `BR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;
    const name = oneLine(d.name);
    const email = oneLine(d.email);
    const subject = `Brochure download [${ref}]: ${name} (${oneLine(d.company)})`;
    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;color:#0f172a">
      <h2 style="color:#0f284e">Brochure download request</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-size:14px">
        <tr><td><b>Reference</b></td><td>${ref}</td></tr>
        <tr><td><b>Name</b></td><td>${esc(name)}</td></tr>
        <tr><td><b>Email</b></td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td><b>Company</b></td><td>${esc(oneLine(d.company))}</td></tr>
        <tr><td><b>Phone</b></td><td>${esc(oneLine(d.phone))}</td></tr>
        <tr><td><b>Country</b></td><td>${esc(oneLine(d.country))}</td></tr>
        <tr><td><b>Requested</b></td><td>Export brochure (PDF)</td></tr>
        <tr><td><b>Privacy consent</b></td><td>Given</td></tr>
        <tr><td><b>IP / time</b></td><td>${esc(ip)} &middot; ${new Date().toISOString()}</td></tr>
      </table></body></html>`;

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const to = process.env.CONTACT_EMAIL || "info@jayimpex.net";

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      await transporter.sendMail({
        from: `"Jay Impex Portal" <${user}>`,
        to,
        replyTo: email,
        subject,
        html,
      });
    } else if (process.env.NODE_ENV !== "production" || process.env.ALLOW_EMAIL_SIMULATION === "true") {
      console.log(`[BROCHURE REQUEST SIMULATION] ref=${ref}`);
    } else {
      console.error(`[BROCHURE_SMTP_NOT_CONFIGURED] request ${ref} not delivered`);
      return NextResponse.json(
        {
          success: false,
          error: "The brochure is temporarily unavailable. Please email info@jayimpex.net and we will send it to you.",
        },
        { status: 503 }
      );
    }

    // The download link is only issued after the details have been delivered
    return NextResponse.json({
      success: true,
      referenceId: ref,
      downloadUrl: `/api/brochure/download?token=${encodeURIComponent(issueBrochureToken())}`,
    });
  } catch (err) {
    console.error("[BROCHURE_API_ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again or email info@jayimpex.net." },
      { status: 500 }
    );
  }
}
