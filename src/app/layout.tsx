import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jayimpex.net"),
  title: {
    default: "Jay Impex | Leading Commodities Exporter & Sourcing Partner | Chennai, India",
    template: "%s | Jay Impex - Commodities Exporters",
  },
  description:
    "Leading Indian exporter of premium commodities, Deity Basmati Rice, authentic spices, pulses, FMCG provisions, and client-driven sourcing of textiles, machineries, utensils, sweets, seasonal fruits, and door mats since 1990 from Chennai, India.",
  keywords: [
    "Jay Impex",
    "Commodities Exporters Chennai",
    "Basmati Rice Exporters India",
    "Deity Basmati Rice",
    "Indian Spices Exporters",
    "Agro Commodities",
    "Textiles Exporters India",
    "Machinery Sourcing India",
    "Stainless Steel Utensils India",
    "Australia Commodities Importers",
    "Chennai Port Exporters",
    "Est 1990",
  ],
  authors: [{ name: "Jay Impex Commercial Desk", url: "https://www.jayimpex.net" }],
  creator: "Jay Impex",
  publisher: "Jay Impex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/Jayimpex-Logo-min.PNG",
    shortcut: "/images/Jayimpex-Logo-min.PNG",
    apple: "/images/Jayimpex-Logo-min.PNG",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jayimpex.net",
    siteName: "Jay Impex",
    title: "Jay Impex | Leading Commodities Exporter & Sourcing Partner | Chennai, India",
    description:
      "Premier Indian exporter of commodities, Deity Basmati Rice, spices, pulses, and custom sourcing of textiles, machineries, utensils, sweets, fruits, and mats. Certified quality, global shipping from Chennai Port to Australia and worldwide.",
    images: [
      {
        url: "/images/Deity_Rice.png",
        width: 1200,
        height: 630,
        alt: "Jay Impex - Leading Commodities Exporter & Sourcing Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Impex | Leading Commodities Exporter & Sourcing Partner",
    description:
      "Premier Indian exporter of commodities, Deity Basmati Rice, spices, pulses, and client sourcing from Chennai Port to Australia & worldwide.",
    images: ["/images/Deity_Rice.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900 font-sans">
        <SkipLink />
        <TopBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
