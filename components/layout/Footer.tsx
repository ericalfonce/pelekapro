import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const shopLinks = [
  { href: "/shop?category=cases", label: "Phone Cases" },
  { href: "/shop?category=chargers", label: "Chargers & Cables" },
  { href: "/shop?category=power-banks", label: "Power Banks" },
  { href: "/shop?category=audio", label: "Earphones & Audio" },
  { href: "/shop?category=smartwatches", label: "Smartwatches" },
  { href: "/shop?category=bundles", label: "Bundle Deals" },
];

const infoLinks = [
  { href: "/about", label: "About PelekaPro" },
  { href: "/academy", label: "PelekaPro Academy" },
  { href: "/about#contact", label: "Contact Us" },
  { href: "/about#delivery", label: "Delivery Info" },
  { href: "/about#returns", label: "Return Policy" },
];

const paymentMethods = [
  { id: "mpesa", label: "M-Pesa" },
  { id: "tigo", label: "Tigo Pesa" },
  { id: "airtel", label: "Airtel Money" },
  { id: "cod", label: "Cash on Delivery" },
];

export function Footer() {
  return (
    <footer className="bg-brand-black text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-baseline gap-0.5 mb-4">
              <span className="font-display font-black text-2xl text-white tracking-tight">Peleka</span>
              <span className="font-display font-black text-2xl text-brand-orange tracking-tight">Pro</span>
            </Link>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6">
              Premium phone accessories delivered to your door — Arusha, Moshi, Dar es Salaam, and Mwanza.
            </p>

            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="https://wa.me/255719363738"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:text-[#4ade80] transition-colors font-body"
              >
                
                +255 719 363 738 (WhatsApp)
              </a>
              <a
                href="tel:+255719363738"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                +255 719 363 738
              </a>
              <a
                href="mailto:habari@pelekapro.co.tz"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body"
              >
                <Mail className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                habari@pelekapro.co.tz
              </a>
              <div className="flex items-start gap-2 text-white/60 font-body">
                <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>Arusha CBD, Tanzania</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 font-body">
                <Clock className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                Mon – Sat: 8:00 AM – 8:00 PM
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Shop
            </h3>
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 text-sm font-body hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Help
            </h3>
            <ul className="flex flex-col gap-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 text-sm font-body hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy + Payment */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-brand-orange mb-5">
              Academy
            </h3>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-4">
              Learn how to import from China and build a profitable accessories business in Tanzania.
            </p>
            <Link
              href="/academy"
              className="inline-block text-sm font-display font-semibold text-brand-orange hover:text-brand-deep transition-colors mb-8"
            >
              Learn more &rarr;
            </Link>

            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-3">
              We Accept
            </h3>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.id}
                  className="text-[0.65rem] font-display font-bold uppercase tracking-wider border border-white/15 text-white/60 px-2.5 py-1"
                >
                  {method.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body">
            &copy; 2025 PelekaPro. All rights reserved. Arusha, Tanzania.
          </p>
          <div className="flex items-center gap-4 text-xs font-body text-white/40">
            <Link href="/about#privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/about#terms" className="hover:text-white/70 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
