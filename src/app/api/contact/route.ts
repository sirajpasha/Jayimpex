import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Rate limiting in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per 10 minutes per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Zod schema for RFQ validation
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(120, "Company name cannot exceed 120 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid business email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .min(6, "Please provide a valid contact number")
    .max(30, "Phone number cannot exceed 30 characters"),
  country: z
    .string()
    .trim()
    .min(2, "Country or destination seaport is required")
    .max(100, "Country cannot exceed 100 characters"),
  commodity: z
    .string()
    .trim()
    .min(2, "Please select an export commodity")
    .max(100),
  volume: z.string().trim().max(100).optional().default(""),
  incoterm: z.string().trim().max(20).optional().default("FOB"),
  message: z
    .string()
    .trim()
    .min(10, "Inquiry message must be at least 10 characters")
    .max(3000, "Inquiry message cannot exceed 3000 characters"),
  honeypot: z.string().optional().default(""),
  renderTimestamp: z.number().optional().default(0),
  consent: z
    .boolean()
    .refine((val) => val === true, "Privacy policy consent is required"),
});

// Helper to sanitize strings from CRLF email header injection
function sanitizeHeader(val: string): string {
  return val.replace(/[\r\n]/g, " ").trim();
}

export async function POST(request: NextRequest) {
  try {
    // 1. Check Request Size (Limit to 100KB)
    const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
    if (contentLength > 102400) {
      return NextResponse.json(
        { success: false, error: "Payload exceeds allowable limit (100KB)." },
        { status: 413 }
      );
    }

    // 2. Extract Client IP for Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many quote requests from this IP. Please wait 10 minutes or call our commercial desk directly.",
        },
        { status: 429 }
      );
    }

    // 3. Parse and Validate Request Body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstIssue ? firstIssue.message : "Invalid submission parameters.",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 4. Anti-Spam Layer 1: Honeypot trap
    if (data.honeypot && data.honeypot.trim() !== "") {
      // Silently pretend success to fool bot scripts
      return NextResponse.json(
        {
          success: true,
          message: "Thank you. Your commercial inquiry has been received.",
        },
        { status: 200 }
      );
    }

    // 5. Anti-Spam Layer 2: Fast Submission Timing (< 2.5 seconds)
    const now = Date.now();
    if (data.renderTimestamp > 0 && now - data.renderTimestamp < 2500) {
      // Sub-2.5 second bot submission
      return NextResponse.json(
        {
          success: true,
          message: "Thank you. Your commercial inquiry has been received.",
        },
        { status: 200 }
      );
    }

    // 6. Formulate Sanitized Commercial Email Content
    const sanitizedName = sanitizeHeader(data.name);
    const sanitizedCompany = sanitizeHeader(data.company);
    const sanitizedEmail = sanitizeHeader(data.email);
    const sanitizedCommodity = sanitizeHeader(data.commodity);
    const sanitizedCountry = sanitizeHeader(data.country);

    const emailSubject = `Export RFQ: ${sanitizedCommodity} - ${sanitizedCompany} (${sanitizedCountry})`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
            .card { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 650px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
            .header { background-color: #0f284e; color: #ffffff; padding: 24px; border-bottom: 3px solid #d97706; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
            .header p { margin: 6px 0 0; font-size: 13px; color: #cbd5e1; }
            .content { padding: 24px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
            .table th { text-align: left; padding: 10px 12px; background-color: #f1f5f9; color: #475569; font-weight: 600; width: 35%; border-bottom: 1px solid #e2e8f0; }
            .table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; }
            .message-box { background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-top: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
            .footer { padding: 16px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2>New Commercial Export Inquiry (RFQ)</h2>
              <p>Submitted via Jay Impex Web Commercial Portal</p>
            </div>
            <div class="content">
              <table class="table">
                <tr>
                  <th>Importer / Buyer:</th>
                  <td><strong>${sanitizedName}</strong></td>
                </tr>
                <tr>
                  <th>Company / Org:</th>
                  <td><strong>${sanitizedCompany}</strong></td>
                </tr>
                <tr>
                  <th>Business Email:</th>
                  <td><a href="mailto:${sanitizedEmail}" style="color: #0284c7;">${sanitizedEmail}</a></td>
                </tr>
                <tr>
                  <th>Phone / WhatsApp:</th>
                  <td>${data.phone}</td>
                </tr>
                <tr>
                  <th>Destination Seaport / Country:</th>
                  <td>${sanitizedCountry}</td>
                </tr>
                <tr>
                  <th>Commodity Sector:</th>
                  <td><span style="background-color: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${sanitizedCommodity}</span></td>
                </tr>
                <tr>
                  <th>Required Volume:</th>
                  <td>${data.volume || "To be discussed"}</td>
                </tr>
                <tr>
                  <th>Preferred Incoterm:</th>
                  <td>${data.incoterm || "FOB"}</td>
                </tr>
              </table>

              <h3 style="font-size: 15px; color: #0f284e; margin: 16px 0 8px;">Detailed Specifications &amp; Message:</h3>
              <div class="message-box">${data.message}</div>
            </div>
            <div class="footer">
              <p style="margin: 0;">Submission IP: ${clientIp} &bull; Timestamp: ${new Date().toISOString()}</p>
              <p style="margin: 4px 0 0;">Jay Impex &bull; 202, Marine Chambers, New Marine Lines, Mumbai - 400 020</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 7. Email Dispatch via Nodemailer (or Staging Simulation)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const toEmail = process.env.CONTACT_EMAIL || "export@jayimpex.net";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Jay Impex Portal" <${smtpUser}>`,
        to: toEmail,
        replyTo: sanitizedEmail,
        subject: emailSubject,
        html: emailHtml,
      });
    } else {
      // In development or when SMTP credentials are not yet configured in env
      console.log("[COMMERCIAL DESK INQUIRY SIMULATION]");
      console.log(`Subject: ${emailSubject}`);
      console.log(`From: ${sanitizedName} <${sanitizedEmail}> (${sanitizedCompany})`);
      console.log(`Commodity: ${sanitizedCommodity} | Volume: ${data.volume}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your quotation request has been transmitted to our Commercial Export Desk. A trade officer will review your requirements and respond within 24 business hours.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[CONTACT_API_ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        error: "An internal system error occurred while transmitting your request. Please try again or reach our desk at export@jayimpex.net.",
      },
      { status: 500 }
    );
  }
}
