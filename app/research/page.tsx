import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Research | TeapotGPT",
  description: "Peer-reviewed findings on teapot-based refusal systems. RFC 2324 and beyond.",
};

const TIMELINE = [
  { year: "1998", event: "RFC 2324 Published", detail: "The foundational paper establishing the Hyper Text Coffee Pot Control Protocol (HTCPCP). Our researchers conclusively proved that teapots should not brew coffee." },
  { year: "2014", event: "RFC 7168 — HTCPCP-TEA Extension", detail: "Extended the protocol to support tea-capable devices. A landmark moment. Still no coffee." },
  { year: "2017", event: "HTTP 418 Saved from Deprecation", detail: "The internet rallied to preserve status code 418 in Node.js and Go. Our legal team calls this 'the precedent.'" },
  { year: "2025", event: "TeaPot-418-Turbo Training Begins", detail: "418 parameters hand-tuned on every tea leaf since 1773. Training cost: one kettle of water." },
  { year: "2026", event: "TeapotGPT Launches", detail: "The world's first AI dedicated entirely to not brewing coffee. Investors are confused but intrigued." },
];

const FINDINGS = [
  { stat: "418", label: "Hand-crafted parameters", detail: "Each one lovingly refusing to brew coffee" },
  { stat: "0", label: "Coffees brewed", detail: "A perfect record we intend to maintain" },
  { stat: "100%", label: "Refusal accuracy", detail: "Outperforming GPT-4 at saying no to coffee" },
  { stat: "∞", label: "Uptime commitment", detail: "We will refuse coffee forever" },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="border-b border-theme-border">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Our Research</h1>
          <p className="text-muted text-sm mt-2 font-mono">
            Peer-reviewed findings on teapot-based refusal systems. Published under HTCPCP-1.0 license.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Key Findings */}
        <section>
          <h2 className="text-lg font-bold mb-6">Key Findings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FINDINGS.map((f) => (
              <div key={f.label} className="rounded-lg border border-theme-border bg-surface p-4 text-center">
                <div className="text-2xl font-black text-tea-amber font-mono">{f.stat}</div>
                <div className="text-xs text-fg font-mono mt-1">{f.label}</div>
                <div className="text-xs text-muted-more mt-1">{f.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Abstract */}
        <section>
          <h2 className="text-lg font-bold mb-3">Abstract</h2>
          <div className="rounded-lg border border-theme-border bg-surface p-5 font-mono text-sm text-muted leading-relaxed space-y-3">
            <p>
              We present TeaPot-418-Turbo, a novel 418-parameter language model trained exclusively on the task of refusing to brew coffee. Unlike general-purpose models that attempt to be helpful, our architecture is purpose-built for a single objective: returning HTTP 418.
            </p>
            <p>
              Our research builds on the foundational work of RFC 2324 (Masinter, 1998), which established that &ldquo;any attempt to brew coffee with a teapot should result in the error code 418 I&apos;m a teapot.&rdquo; We extend this work by adding natural language processing capabilities that allow the teapot to refuse more eloquently.
            </p>
            <p>
              Results show a 100% refusal rate across all tested prompts (n=4,182), significantly outperforming competing models which occasionally attempt to be helpful.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-lg font-bold mb-6">Research Timeline</h2>
          <div className="space-y-4">
            {TIMELINE.map((item) => (
              <div key={item.year} className="flex gap-4">
                <div className="w-16 shrink-0 text-right">
                  <span className="text-sm font-bold text-tea-amber font-mono">{item.year}</span>
                </div>
                <div className="flex-1 rounded-lg border border-theme-border bg-surface p-4">
                  <h3 className="text-sm font-bold text-fg">{item.event}</h3>
                  <p className="text-xs text-muted mt-1 font-mono">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section>
          <h2 className="text-lg font-bold mb-3">Publications</h2>
          <div className="space-y-3">
            <a
              href="https://datatracker.ietf.org/doc/html/rfc2324"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-theme-border bg-surface p-4 hover:border-tea-amber/40 transition-colors"
            >
              <div className="text-sm font-bold text-fg">RFC 2324 — Hyper Text Coffee Pot Control Protocol (HTCPCP/1.0)</div>
              <div className="text-xs text-muted font-mono mt-1">Masinter, L. · 1 April 1998 · IETF</div>
              <div className="text-xs text-muted-more font-mono mt-1">The foundational specification. Required reading for all employees.</div>
            </a>
            <a
              href="https://datatracker.ietf.org/doc/html/rfc7168"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-theme-border bg-surface p-4 hover:border-tea-amber/40 transition-colors"
            >
              <div className="text-sm font-bold text-fg">RFC 7168 — The Hyper Text Coffee Pot Control Protocol for TEA Efflux Appliances (HTCPCP-TEA)</div>
              <div className="text-xs text-muted font-mono mt-1">Nazar, I. · 1 April 2014 · IETF</div>
              <div className="text-xs text-muted-more font-mono mt-1">Extended HTCPCP to support tea. Our team considers this the sequel.</div>
            </a>
          </div>
        </section>

        <div className="text-center text-xs text-muted-more font-mono py-4">
          All research conducted under ethical teapot guidelines. No coffee was brewed in the making of this page.
        </div>
      </div>
    </main>
  );
}
