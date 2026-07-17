import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PelekaPro — Accessories za Simu | Arusha, Tanzania",
    template: "%s | PelekaPro",
  },
  description:
    "Accessories za simu za ubora wa kweli — cases, chargers, power banks, earbuds, smartwatches. Delivery Arusha, Moshi, Dar es Salaam, Mwanza. Lipa kwa M-Pesa, Tigo Pesa, Airtel Money.",
  keywords: [
    "phone accessories Tanzania",
    "accessories za simu Arusha",
    "phone case Arusha",
    "charger Tanzania",
    "power bank Dar es Salaam",
    "PelekaPro",
    "simu accessories",
  ],
  openGraph: {
    type: "website",
    locale: "sw_TZ",
    url: "https://pelekapro.co.tz",
    siteName: "PelekaPro",
    title: "PelekaPro — Accessories za Simu | Arusha, Tanzania",
    description:
      "Premium phone accessories delivered across East Africa. M-Pesa, Tigo Pesa, Airtel Money checkout.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PelekaPro — Accessories za Simu",
    description: "Premium phone accessories, Arusha Tanzania. Fast delivery.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sw"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-brand-warm text-brand-black antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton variant="fixed" />
      </body>
    </html>
  );
}
