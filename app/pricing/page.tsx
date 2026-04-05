"use client";

import { useState } from "react";
import Link from "next/link";

const TIERS = [
  {
    name: "Steep",
    subtitle: "Free",
    price: "$0",
    period: "/mo",
    highlight: false,
    features: [
      "10 brews per day",
      "Basic refusals",
      "Community support (the teapot ignores you)",
      "Standard 418 responses",
      "Shared teapot infrastructure",
    ],
    cta: "Start Failing",
    ctaHref: "/",
  },
  {
    name: "Pour Over",
    subtitle: "Pro",
    price: "$0",
    period: "/mo",
    previousPrice: "$0/mo — 100% off!",
    highlight: true,
    features: [
      "Unlimited brews",
      "Premium refusals (longer, more eloquent)",
      "Priority rejection queue",
      "Advanced 418 analytics dashboard",
      "Custom refusal tone (sarcastic, philosophical, corporate)",
      "Email support (auto-replies with 418)",
    ],
    cta: "Upgrade to Rejection",
    ctaHref: "/",
  },
  {
    name: "Full Kettle",
    subtitle: "Enterprise",
    price: "Contact Sales",
    period: "",
    highlight: false,
    features: [
      "Everything in Pour Over",
      "Dedicated account teapot",
      "SLA: 99.99% guaranteed refusal uptime",
      "Custom branded 418 pages",
      "On-premise teapot deployment",
      "Compliance: SOC 2, HTCPCP-1.0, RFC 2324",
      "24/7 phone support (we just breathe into the phone)",
    ],
    cta: "Contact Sales",
    ctaHref: "#",
  },
];

const FEATURES_TABLE = [
  { feature: "HTTP 418 responses", steep: true, pourOver: true, fullKettle: true },
  { feature: "Creative refusals", steep: true, pourOver: true, fullKettle: true },
  { feature: "Unlimited brews", steep: false, pourOver: true, fullKettle: true },
  { feature: "Priority rejection", steep: false, pourOver: true, fullKettle: true },
  { feature: "418 analytics", steep: false, pourOver: true, fullKettle: true },
  { feature: "Custom refusal tone", steep: false, pourOver: true, fullKettle: true },
  { feature: "Dedicated teapot", steep: false, pourOver: false, fullKettle: true },
  { feature: "SLA (Service Level Avoidance)", steep: false, pourOver: false, fullKettle: true },
  { feature: "On-premise deployment", steep: false, pourOver: false, fullKettle: true },
  { feature: "Actual coffee", steep: false, pourOver: false, fullKettle: false },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [showContactMessage, setShowContactMessage] = useState(false);

  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="border-b border-theme-border">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <Link href="/" className="text-sm text-muted hover:text-muted-more font-mono transition-colors">
            &larr; Back to TeapotGPT
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-4">Pricing</h1>
          <p className="text-muted text-sm mt-2 font-mono">
            Simple, transparent pricing. All plans include being refused coffee.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setBilling("monthly")}
              className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                billing === "monthly" ? "bg-tea-amber/10 text-tea-amber border border-tea-amber/30" : "text-muted"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`text-xs font-mono px-3 py-1 rounded-full transition-colors ${
                billing === "annual" ? "bg-tea-amber/10 text-tea-amber border border-tea-amber/30" : "text-muted"
              }`}
            >
              Annual (save 0%)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Pricing cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-5 flex flex-col ${
                tier.highlight
                  ? "border-tea-amber/50 bg-tea-amber/5 ring-1 ring-tea-amber/20"
                  : "border-theme-border bg-surface"
              }`}
            >
              <div className="text-xs font-mono font-bold mb-2 h-4">
                {tier.highlight ? <span className="text-tea-amber">MOST POPULAR</span> : null}
              </div>
              <h3 className="text-lg font-bold text-fg">{tier.name}</h3>
              <div className="text-xs text-muted-more font-mono">{tier.subtitle}</div>
              <div className="mt-3">
                <span className="text-3xl font-black text-fg">{tier.price}</span>
                <span className="text-sm text-muted font-mono">{tier.period}</span>
              </div>
              {tier.previousPrice && (
                <p className="text-xs text-tea-amber font-mono mt-1">was {tier.previousPrice}</p>
              )}
              <ul className="mt-4 space-y-2 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs font-mono text-muted">
                    <span className="text-tea-amber mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (tier.name === "Full Kettle") setShowContactMessage(true);
                }}
                className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  tier.highlight
                    ? "bg-gradient-to-br from-tea-amber to-tea-amber-hover text-black hover:brightness-110 shadow-sm shadow-tea-amber/20"
                    : "border border-theme-border text-fg hover:border-tea-amber/40 hover:text-tea-amber"
                }`}
              >
                {tier.name === "Full Kettle" && showContactMessage ? "418 I'm a Teapot" : tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature comparison */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-center">Feature Comparison</h2>
          <div className="rounded-lg border border-theme-border bg-surface overflow-hidden">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-theme-border bg-bg">
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Feature</th>
                  <th className="text-center px-4 py-3 text-xs text-muted font-medium">Steep</th>
                  <th className="text-center px-4 py-3 text-xs text-tea-amber font-medium">Pour Over</th>
                  <th className="text-center px-4 py-3 text-xs text-muted font-medium">Full Kettle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {FEATURES_TABLE.map((row) => (
                  <tr key={row.feature} className={row.feature === "Actual coffee" ? "bg-error-418/5" : ""}>
                    <td className="px-4 py-2.5 text-xs text-fg">{row.feature}</td>
                    <td className="text-center px-4 py-2.5">{row.steep ? <span className="text-tea-amber">✓</span> : <span className="text-error-418">✗</span>}</td>
                    <td className="text-center px-4 py-2.5">{row.pourOver ? <span className="text-tea-amber">✓</span> : <span className="text-error-418">✗</span>}</td>
                    <td className="text-center px-4 py-2.5">{row.fullKettle ? <span className="text-tea-amber">✓</span> : <span className="text-error-418">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="text-center">
          <h2 className="text-lg font-bold mb-3">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-xl mx-auto text-left">
            {[
              ["Can I get a refund?", "A refund of $0 has been processed to your account."],
              ["Do you offer a free trial?", "All plans are free. The trial never ends. Neither does the refusal."],
              ["What payment methods do you accept?", "We accept Visa, Mastercard, and existential acceptance that you will not get coffee."],
              ["Is there a student discount?", "Yes. Students pay $0 instead of $0."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-lg border border-theme-border bg-surface p-4">
                <h3 className="text-sm font-bold text-fg">{q}</h3>
                <p className="text-xs text-muted font-mono mt-1">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
