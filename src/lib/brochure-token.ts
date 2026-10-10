import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 10 * 60 * 1000; // download links are valid for 10 minutes

function secret(): string {
  // Dedicated secret if provided, otherwise derive one from the SMTP password so tokens
  // cannot be forged without a server-side secret in production.
  return process.env.BROCHURE_TOKEN_SECRET || `brochure:${process.env.SMTP_PASS ?? "local-dev-only"}`;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueBrochureToken(now = Date.now()): string {
  const exp = String(now + TTL_MS);
  return `${exp}.${sign(exp)}`;
}

export function verifyBrochureToken(token: string | null, now = Date.now()): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < now) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
