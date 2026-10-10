/**
 * Best-effort WhatsApp alert through the WhatsApp Business Cloud API (Meta).
 *
 * Required environment variables (nothing is sent when they are missing):
 *   WHATSAPP_TOKEN            permanent access token of a WhatsApp Business app
 *   WHATSAPP_PHONE_NUMBER_ID  ID of the business phone number that sends the message
 * Optional:
 *   WHATSAPP_TO               recipient, digits with country code (default 919444042275)
 *   WHATSAPP_TEMPLATE         approved template name. Needed for messages sent outside the
 *                             24-hour customer-service window; it must have ONE body variable.
 *   WHATSAPP_TEMPLATE_LANG    template language code (default "en")
 *
 * Failures are logged and never block the enquiry.
 */
export async function sendWhatsAppAlert(text: string): Promise<"sent" | "not-configured" | "failed"> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.warn("[WHATSAPP_NOT_CONFIGURED] alert not sent");
    return "not-configured";
  }

  const to = (process.env.WHATSAPP_TO || "919444042275").replace(/\D/g, "");
  const template = process.env.WHATSAPP_TEMPLATE;
  const body = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
          // template variables cannot contain newlines or long runs of spaces
          components: [{ type: "body", parameters: [{ type: "text", text: text.replace(/\s+/g, " ").slice(0, 900) }] }],
        },
      }
    : { messaging_product: "whatsapp", to, type: "text", text: { body: text.slice(0, 3800) } };

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[WHATSAPP_SEND_FAILED]", res.status, (await res.text()).slice(0, 300));
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[WHATSAPP_SEND_ERROR]", err);
    return "failed";
  }
}
