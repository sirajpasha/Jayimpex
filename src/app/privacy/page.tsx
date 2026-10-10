import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Trade Data Notice | Jay Impex",
  description:
    "Privacy and data protection commitment for Jay Impex commercial inquiries, RFQ submissions, and trade correspondence.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-12 lg:py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">Privacy Notice</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Commercial Confidentiality Commitment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Privacy Policy &amp; Commercial Data Notice
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Last updated: October 2026. This policy outlines how Jay Impex collects,
              uses, and safeguards commercial inquiries and trade partner information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-xl font-bold text-[#0F284E] mb-3">1. Scope &amp; Purpose</h2>
            <p className="text-slate-600">
              Jay Impex is a Govt. Recognized Export House operating from Chennai, Tamil Nadu, India.
              We operate exclusively as a business-to-business (B2B) international commodities
              merchant and exporter. We collect business contact and quotation parameters solely to
              process Requests for Quotation (RFQs), formulate proforma invoices, coordinate marine
              shipping logistics, and maintain trade correspondence.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F284E] mb-3">2. Information We Collect</h2>
            <p className="text-slate-600 mb-2">
              When you submit an export quotation request or commercial inquiry, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Contact details: Name, designation, business email address, phone/WhatsApp number.</li>
              <li>Company details: Business/importer name, country of incorporation, target destination seaport.</li>
              <li>Trade specifications: Commodity requirements, estimated volume, preferred packaging, Incoterms.</li>
              <li>Brochure requests: Name, email, company, phone and country entered in the brochure download form.</li>
              <li>Technical logs: IP address, submission timestamp, and basic browser user-agent for rate-limiting and anti-spam verification.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F284E] mb-3">3. How Information Is Used</h2>
            <p className="text-slate-600 mb-2">We process collected data exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Formulating accurate FOB, CIF, or CFR commodity price quotations.</li>
              <li>Communicating phytosanitary specifications, laboratory test results, and shipping schedules.</li>
              <li>Fulfilling statutory export documentation with customs and regulatory bodies (APEDA, DGFT).</li>
              <li>Notifying our commercial team of your enquiry by email.</li>
              <li>Preventing malicious denial-of-service, automated form spam, and phishing attempts.</li>
            </ul>
            <p className="text-slate-600 mt-2 font-medium">
              We never sell, rent, monetize, or disclose your corporate or personal data to third-party marketing brokers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F284E] mb-3">4. Data Security &amp; Retention</h2>
            <p className="text-slate-600">
              Inquiry submissions are transmitted over encrypted TLS/SSL channels. Form submissions
              are routed securely to our commercial desk email server. We retain commercial
              inquiry records only as long as necessary to facilitate ongoing business negotiations,
              comply with statutory foreign trade record-keeping laws, or resolve commercial disputes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F284E] mb-3">5. Your Privacy Rights</h2>
            <p className="text-slate-600">
              You have the right to request access to the business contact data we hold for you,
              request corrections to inaccurate records, or ask for the deletion of non-statutory
              commercial correspondence. To exercise these rights, please contact our trade compliance desk.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900">Commercial Compliance Contact</h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-1">
              <div><strong>Jay Impex — Compliance Desk</strong></div>
              <div>Marginfree Super Market, 1739, 18th Main Road, Anna Nagar West, Chennai - 600040, Tamil Nadu, India</div>
              <div>
                Email:{" "}
                <a href="mailto:info@jayimpex.net" className="text-[#0284C7] hover:underline font-mono">
                  info@jayimpex.net
                </a>
              </div>
              <div>
                Helpline:{" "}
                <a href="tel:+919444042275" className="text-[#0284C7] hover:underline font-mono">
                  +91 94440 42275
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center text-sm font-semibold text-[#0F284E] hover:text-[#0284C7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return to Commercial Contact Desk</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
