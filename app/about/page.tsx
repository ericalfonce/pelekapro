import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "About PelekaPro — Our Story | Arusha, Tanzania",
  description:
    "PelekaPro — phone accessories business based in Arusha, Tanzania. We believe quality accessories shouldn't cost a fortune or take two weeks to arrive.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-orange text-white text-xs font-display font-bold uppercase tracking-widest px-3 py-1.5 mb-6">
              About Us
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl leading-tight mb-5">
              Started in Arusha.<br />
              <span className="text-brand-orange">Growing across East Africa.</span>
            </h1>
            <p className="text-white/65 font-body text-lg leading-relaxed">
              PelekaPro started with one goal: genuine quality accessories for Tanzanians — no middlemen markups, no fake products, no waiting two weeks for delivery.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-brand-warm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading title="Our Story" className="mb-6" />
              <div className="flex flex-col gap-4 text-brand-black/80 font-body text-base leading-relaxed">
                <p>
                  We started with a small shop in Arusha CBD — two phones, one WhatsApp Business account, and a bajaj for delivery. Four years later, we ship to 4,200+ customers across Tanzania.
                </p>
                <p>
                  The problem we saw on day one is still there: most accessories sold in Tanzania are fake, overpriced without reason, or arrive too slowly. People accept that a TSh 2,000 charger burning out after two months is &ldquo;normal.&rdquo; It&apos;s not normal — it&apos;s a scam.
                </p>
                <p>
                  PelekaPro was built to change that. Every product we sell has passed through our own hands first. Every supplier has gone through a sample order before a large batch. Our prices reflect real quality — not a quick hustle.
                </p>
                <p>
                  We also knew from the beginning that knowledge is power. That&apos;s why we launched <strong>PelekaPro Academy</strong> — to give others the tools and knowledge to do what we did, without the expensive mistakes we made along the way.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {values.map((v) => (
                <div key={v.title} className="bg-white p-5 border-l-4 border-brand-orange">
                  <p className="font-display font-bold text-brand-black mb-1">{v.title}</p>
                  <p className="text-brand-gray text-sm font-body leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY INFO */}
      <section id="delivery" className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Delivery Information" className="mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => (
              <div key={zone.city} className="bg-brand-warm p-5 border border-black/8">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                  <p className="font-display font-bold text-brand-black">{zone.city}</p>
                </div>
                <p className="text-brand-orange font-display font-black text-xl mb-1">
                  TSh {zone.fee.toLocaleString()}
                </p>
                <p className="text-brand-gray text-xs font-body">{zone.time}</p>
                {zone.freeOver && (
                  <p className="text-green-700 text-xs font-body mt-1 font-semibold">
                    Free for orders over TSh {zone.freeOver.toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-brand-gray text-xs font-body mt-4">
            * Remote areas within a region may carry a small surcharge. Contact us for exact pricing.
          </p>
        </div>
      </section>

      {/* RETURN POLICY */}
      <section id="returns" className="bg-brand-warm py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Return Policy" className="mb-8" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-black/8">
              <h3 className="font-display font-bold text-brand-black text-lg mb-4 border-b border-black/8 pb-4">
                You can return an item if:
              </h3>
              <ul className="flex flex-col gap-3">
                {returnReasons.good.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm font-body text-brand-black/80">
                    <span className="text-green-600 font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 border border-black/8">
              <h3 className="font-display font-bold text-brand-black text-lg mb-4 border-b border-black/8 pb-4">
                Returns are not accepted for:
              </h3>
              <ul className="flex flex-col gap-3">
                {returnReasons.bad.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm font-body text-brand-black/80">
                    <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">&#10007;</span>
                    {r}
                  </li>
                ))}
              </ul>
              <p className="text-brand-gray text-xs font-body mt-4 pt-4 border-t border-black/8">
                Return window: 7 days from when you receive the item. Item must be in original packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-brand-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionHeading
                title="Contact Us"
                className="mb-6 [&_h2]:text-white [&_p]:text-white/50 [&_h2::before]:bg-brand-orange"
              />
              <p className="text-white/60 font-body text-base leading-relaxed mb-8">
                We&apos;re here for you — products, delivery, or any question. WhatsApp is the fastest way to reach us.
              </p>
              <div className="flex flex-col gap-4">
                <a href="https://wa.me/255719363738" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#25D366] hover:text-[#4ade80] transition-colors">
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-display font-semibold">WhatsApp (Fastest)</p>
                    <p className="text-white/40 text-xs font-body">+255 719 363 738 — Reply within 30 minutes</p>
                  </div>
                </a>
                <a href="tel:+255719363738"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-display font-semibold">Phone</p>
                    <p className="text-white/40 text-xs font-body">+255 719 363 738</p>
                  </div>
                </a>
                <a href="mailto:habari@pelekapro.co.tz"
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-display font-semibold">Email</p>
                    <p className="text-white/40 text-xs font-body">habari@pelekapro.co.tz</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-brand-orange mt-0.5" />
                  <div>
                    <p className="font-display font-semibold">Office</p>
                    <p className="text-white/40 text-xs font-body">Arusha CBD, Tanzania<br />Full address sent to customers upon order confirmation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Clock className="w-5 h-5 flex-shrink-0 text-brand-orange" />
                  <div>
                    <p className="font-display font-semibold">Business Hours</p>
                    <p className="text-white/40 text-xs font-body">Monday – Saturday: 8:00 AM – 8:00 PM EAT</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <WhatsAppButton
                  label="Start a WhatsApp Chat"
                  variant="inline"
                  message="Hi PelekaPro! I have a question."
                  className="text-base px-6 py-3"
                />
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-brand-warm p-6">
              <h3 className="font-display font-bold text-brand-black text-lg mb-5">
                Send a Message
              </h3>
              <form action="/api/contact" method="post" className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">Name *</label>
                    <input type="text" name="name" required placeholder="Your name"
                      className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">Phone *</label>
                    <input type="tel" name="phone" required placeholder="+255 7XX XXX XXX"
                      className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange" />
                  </div>
                </div>
                <div>
                  <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">Subject</label>
                  <select name="subject"
                    className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black focus:outline-none focus:border-brand-orange bg-white">
                    <option>Product question</option>
                    <option>Order status</option>
                    <option>Return / Exchange</option>
                    <option>PelekaPro Academy</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">Message *</label>
                  <textarea name="message" rows={5} required placeholder="Tell us more..."
                    className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange resize-none" />
                </div>
                <button type="submit"
                  className="bg-brand-orange text-white font-display font-bold text-base py-4 px-6 rounded hover:bg-brand-deep transition-colors w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY (minimal, PDPA 2022 compliance) */}
      <section id="privacy" className="bg-brand-warm py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-brand-black text-xl mb-4">Privacy Policy (Summary)</h2>
          <div className="text-brand-black/70 font-body text-sm leading-relaxed flex flex-col gap-3">
            <p>PelekaPro collects personal data (name, phone, address) only to fulfil your delivery and communicate with you about your order. We will never sell your data to third parties.</p>
            <p>Your data is stored securely. You can request deletion of your data at any time by contacting us.</p>
            <p>For privacy questions: <a href="mailto:privacy@pelekapro.co.tz" className="text-brand-orange hover:text-brand-deep">privacy@pelekapro.co.tz</a></p>
          </div>
        </div>
      </section>
    </>
  );
}

const values = [
  {
    title: "Quality is non-negotiable",
    body: "We don't ship anything we're not satisfied with ourselves. Every batch goes through our own inspection first.",
  },
  {
    title: "Fair prices for everyone",
    body: "No different pricing for Arusha CBD vs. Moshi. Same price everywhere — transparency is our strength.",
  },
  {
    title: "Delivery with respect",
    body: "We keep you updated at every step — order confirmed, shipped, and delivered. You're never left guessing.",
  },
];

const deliveryZones = [
  { city: "Arusha CBD", fee: 3000, time: "Within 4 hours (Mon–Sat)", freeOver: 50000 },
  { city: "Arusha (Outside CBD)", fee: 5000, time: "4–8 hours", freeOver: 80000 },
  { city: "Moshi", fee: 8000, time: "1–2 days" },
  { city: "Dar es Salaam", fee: 12000, time: "2–3 days" },
  { city: "Mwanza", fee: 14000, time: "2–4 days" },
  { city: "Other (Tanzania)", fee: 15000, time: "3–5 days (contact us)" },
];

const returnReasons = {
  good: [
    "Item damaged during delivery",
    "Item not working on arrival (Dead on Arrival)",
    "Wrong item received (wrong model, wrong colour)",
    "Packaging clearly shows item was mishandled",
  ],
  bad: [
    "Item has been used and shows signs of wear",
    "Original packaging has been discarded",
    "More than 7 days have passed since delivery",
    "Damage caused by misuse (dropped, water damage, etc.)",
  ],
};
