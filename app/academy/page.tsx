import type { Metadata } from "next";
import { Calendar, MapPin, Clock, Users, Star, CheckCircle, ArrowRight } from "lucide-react";
import { seminars, academyStats } from "@/lib/data/academy";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PelekaPro Academy — Learn to Import Phone Accessories",
  description:
    "Practical seminars on importing phone accessories from China and building a profitable business in Tanzania. Based in Arusha.",
};

const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function AcademyPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-black relative overflow-hidden">
        <span aria-hidden="true" className="absolute right-0 top-0 font-display font-black text-[24rem] text-white/[0.025] leading-none select-none pointer-events-none">
          Aka<br />demia
        </span>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-orange text-white text-xs font-display font-bold uppercase tracking-widest px-3 py-1.5 mb-6">
              PelekaPro Academy
            </span>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Start your own business.<br />
              <span className="text-brand-orange">We show you how.</span>
            </h1>
            <p className="text-white/65 font-body text-lg leading-relaxed mb-8 max-w-lg">
              Practical one-day seminars that teach you how to source phone accessories from China — and sell them profitably in Tanzania. Uzoefu wa miaka 4+ condensed into a single day.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#seminars"
                className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold text-base px-7 py-4 hover:bg-brand-deep transition-colors"
              >
                View Upcoming Seminars <ArrowRight className="w-4 h-4" />
              </a>
              <WhatsAppButton
                message="Hi! I want to know more about PelekaPro Academy."
                label="Ask on WhatsApp"
                className="border-2 border-white/20 !bg-transparent text-white hover:!bg-white/10 rounded-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-orange py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem value={academyStats.graduates} label="Graduates" />
            <StatItem value={academyStats.rating + "/5"} label="Average rating" />
            <StatItem value={academyStats.businessStarted} label="Started a business within 6 months" />
            <StatItem value={academyStats.averageROI} label="Average ROI reported" />
          </div>
        </div>
      </section>

      {/* WHY ACADEMY */}
      <section className="bg-brand-warm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeading
                title="Why PelekaPro Academy?"
                subtitle="Unlike other seminars — we teach from real business experience"
                className="mb-8"
              />
              <div className="flex flex-col gap-5">
                {whyPoints.map((p) => (
                  <div key={p.title} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display font-bold text-brand-black text-sm">{p.title}</p>
                      <p className="text-brand-gray text-sm font-body leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="flex flex-col gap-4">
              <blockquote className="bg-white p-6 border-l-4 border-brand-orange">
                <p className="font-body text-brand-black/80 text-base leading-relaxed mb-4 italic">
                  &ldquo;I knew nothing about importation. After the PelekaPro seminar I decided to try. 3 months later I had a working business in Arusha — and now I&apos;ve opened a second one in Moshi.&rdquo;
                </p>
                <footer>
                  <p className="font-display font-bold text-brand-black">Kelvin O.</p>
                  <p className="text-brand-gray text-xs font-body">Graduate, Cohort 8 — Arusha</p>
                  <div className="flex mt-1">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                </footer>
              </blockquote>
              <blockquote className="bg-white p-6 border-l-4 border-brand-orange">
                <p className="font-body text-brand-black/80 text-base leading-relaxed mb-4 italic">
                  &ldquo;My first supplier scammed me before I attended the Academy. After the seminar I could spot the red flags immediately. You need to know this before you start.&rdquo;
                </p>
                <footer>
                  <p className="font-display font-bold text-brand-black">Miriam N.</p>
                  <p className="text-brand-gray text-xs font-body">Graduate, Cohort 11 — Dar es Salaam</p>
                  <div className="flex mt-1">
                    {[1,2,3,4,5].map((n) => (
                      <Star key={n} className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* SEMINARS */}
      <section id="seminars" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Upcoming Seminars"
            subtitle="Choose the seminar that fits you — spots are limited"
            className="mb-10"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {seminars.map((seminar) => {
              const hasEarlyBird =
                seminar.earlyBirdPrice &&
                seminar.earlyBirdDeadline &&
                new Date(seminar.earlyBirdDeadline) > new Date();

              return (
                <article
                  key={seminar.id}
                  className="border border-black/10 bg-brand-warm flex flex-col"
                >
                  <div className="bg-brand-black p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-display font-bold uppercase tracking-wider px-2 py-0.5 ${levelColors[seminar.level]}`}>
                        {levelLabels[seminar.level]}
                      </span>
                      {seminar.spotsLeft <= 5 && (
                        <span className="deal-badge">Only {seminar.spotsLeft} spots left!</span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg leading-snug mb-1">
                      {seminar.title}
                    </h3>
                    <p className="text-white/50 text-xs font-body">{seminar.subtitle}</p>
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2 text-sm font-body text-brand-black">
                      <Calendar className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {seminar.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body text-brand-black">
                      <Clock className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {seminar.time} &mdash; {seminar.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body text-brand-black">
                      <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {seminar.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body text-brand-black">
                      <Users className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      {seminar.spotsLeft} of {seminar.spots} spots remaining
                    </div>

                    <div className="mt-2">
                      <p className="font-display font-semibold text-brand-black text-xs uppercase tracking-wider mb-2">You will learn:</p>
                      <ul className="flex flex-col gap-1.5">
                        {seminar.topics.slice(0, 4).map((t) => (
                          <li key={t} className="flex items-start gap-2 text-xs font-body text-brand-black/70">
                            <span className="text-brand-orange mt-0.5 flex-shrink-0">&rsaquo;</span>
                            {t}
                          </li>
                        ))}
                        {seminar.topics.length > 4 && (
                          <li className="text-xs text-brand-gray font-body">+ {seminar.topics.length - 4} more topics...</li>
                        )}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t border-black/8">
                      {hasEarlyBird ? (
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display font-black text-brand-orange text-2xl">
                              TSh {formatPrice(seminar.earlyBirdPrice)}
                            </span>
                            <span className="text-brand-gray line-through text-sm font-body">TSh {formatPrice(seminar.price)}</span>
                            <span className="deal-badge">Early Bird</span>
                          </div>
                          <p className="text-xs text-brand-gray font-body mt-1">
                            Price expires {seminar.earlyBirdDeadline}
                          </p>
                        </div>
                      ) : (
                        <span className="font-display font-black text-brand-black text-2xl">
                          <span className="price-tsh text-sm mr-0.5">TSh</span>{formatPrice(seminar.price)}
                        </span>
                      )}
                    </div>

                    <WhatsAppButton
                      message={`Hi! I want to register for: "${seminar.title}" (${seminar.date})`}
                      label="Register via WhatsApp"
                      className="w-full justify-center mt-2"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="bg-brand-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionHeading
              title="Have a Question?"
              subtitle="Write to us — we reply within one hour."
              className="items-center text-center [&_h2]:text-white [&_h2::before]:mx-auto [&_p]:text-white/50"
            />
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display font-black text-white text-3xl md:text-4xl">{value}</p>
      <p className="text-white/70 text-sm font-body mt-1">{label}</p>
    </div>
  );
}

const whyPoints = [
  {
    title: "Real experience, not just theory",
    body: "Our team has run an accessories business for 4+ years. We teach what we actually do ourselves.",
  },
  {
    title: "Open books — real China prices",
    body: "You leave with a database of 50+ verified suppliers and real landed cost calculations.",
  },
  {
    title: "Permanent WhatsApp alumni group",
    body: "Support doesn't end at the seminar — ask questions anytime in the graduates group.",
  },
  {
    title: "Small cohorts — personal attention",
    body: "Only 20-30 seats per seminar. You can ask your own questions — not a 200-person lecture hall.",
  },
  {
    title: "Tanzania-specific challenges covered",
    body: "TRA customs, VAT, Dar es Salaam logistics — we handle Tanzania's specific regulations in detail.",
  },
];

function EnquiryForm() {
  return (
    <form
      action="/api/academy-enquiry"
      method="post"
      className="bg-brand-warm p-6 flex flex-col gap-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+255 7XX XXX XXX"
            className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">
            Email (Optional)
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
          />
        </div>
        <div>
          <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">
            Seminar of Interest
          </label>
          <select
            name="seminarId"
            className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black focus:outline-none focus:border-brand-orange bg-white"
          >
            <option value="">-- Select a seminar --</option>
            <option value="sem-001">Importation Mastery (19 July)</option>
            <option value="sem-002">Online Sales Bootcamp (9 August)</option>
            <option value="sem-003">Advanced Sourcing (6 September)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block font-display font-semibold text-brand-black text-sm mb-1.5">
          Your Question or Message
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your current situation and what you want to learn..."
          className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-brand-orange text-white font-display font-bold text-base py-4 px-6 rounded hover:bg-brand-deep transition-colors w-full sm:w-auto self-start"
      >
        Send Message
      </button>
      <p className="text-xs text-brand-gray font-body">
        Or message us directly on WhatsApp:{" "}
        <a href="https://wa.me/255719363738" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold">+255 719 363 738</a>
      </p>
    </form>
  );
}
