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
    default: "Jay Impex | Global Agro Commodities & FMCG Exporters",
    template: "%s | Jay Impex - Agro & FMCG Exporters",
  },
  description:
    "Leading Indian exporter of premium Deity Basmati Rice, authentic pulses, whole & ground spices, and FMCG commodities to worldwide ports since 2005. APEDA & ISO 9001:2015 certified.",
  keywords: [
    "Jay Impex",
    "Basmati Rice Exporters India",
    "Deity Basmati Rice",
    "1121 Steam Rice",
    "Indian Spices Exporters",
    "Agro Commodities",
    "Pulses Exporters Mumbai",
    "FMCG Exports",
    "JNPT Port Agro Exporters",
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
    title: "Jay Impex | Global Agro Commodities & FMCG Exporters",
    description:
      "Premier Indian exporter of Deity Basmati Rice, whole and ground spices, pulses, and FMCG provisions. Certified quality, global shipping from JNPT port.",
    images: [
      {
        url: "/images/Deity_Rice.png",
        width: 1200,
        height: 630,
        alt: "Jay Impex - Premium Agro Commodities & Deity Rice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jay Impex | Global Agro Commodities & FMCG Exporters",
    description:
      "Premier Indian exporter of Deity Basmati Rice, whole and ground spices, pulses, and FMCG provisions.",
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
