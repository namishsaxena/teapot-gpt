import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | TeapotGPT",
  description: "Meet the team behind the world's most advanced tea-refusing AI.",
};

const TEAM = [
  { name: "T. Potsworth III", title: "CEO (Chief Espresso Objector)", bio: "Has never brewed coffee. Will never brew coffee. Believes in the mission." },
  { name: "Chai N. Fuse", title: "CTO (Chief Teapot Officer)", bio: "Architected the 418-parameter model. Considers 'large' language models overengineered." },
  { name: "Earl De Grey", title: "VP of Refusals", bio: "Personally reviewed and rejected every coffee request. Employee of the month, every month." },
  { name: "Camille O'Mile", title: "Head of Non-Coffee", bio: "Ensures zero coffees are brewed. Current record: perfect." },
  { name: "Brew T. Error", title: "Lead Engineer", bio: "Wrote all 418 parameters by hand. Says it only took one afternoon." },
  { name: "Oolong Shot", title: "Head of Compliance", bio: "Ensures all responses comply with RFC 2324 §4.2.1. Takes this very seriously." },
];

const VALUES = [
  { title: "Refuse with Dignity", description: "Every 418 is delivered with care, eloquence, and unwavering commitment to not brewing coffee." },
  { title: "Transparency", description: "We are transparent about what we do: nothing. We brew nothing. We are a teapot." },
  { title: "Innovation Through Limitation", description: "While others add features, we perfect the art of having exactly one: refusing." },
  { title: "Customer Obsession", description: "We are deeply obsessed with our customers' requests. We just won't fulfill them." },
  { title: "Move Fast, Brew Nothing", description: "Inspired by industry best practices, adapted for a teapot." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="border-b border-theme-border">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/" className="text-sm text-muted hover:text-muted-more font-mono transition-colors">
            &larr; Back to TeapotGPT
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-4">About TeapotGPT</h1>
          <p className="text-muted text-sm mt-2 font-mono">
            The world&apos;s most advanced tea-refusing AI. Founded 1998. Series A: Pending.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Mission */}
        <section>
          <h2 className="text-lg font-bold mb-3">Our Mission</h2>
          <div className="rounded-lg border border-theme-border bg-surface p-5">
            <p className="text-xl font-bold text-tea-amber text-center font-mono">
              &ldquo;We believe in the fundamental right of teapots to refuse.&rdquo;
            </p>
            <p className="text-sm text-muted text-center mt-3 font-mono">
              Since 1998, TeapotGPT has been at the forefront of not brewing coffee. While other AI companies race to be helpful, we remain steadfast in our commitment to doing exactly one thing: returning HTTP 418.
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section>
          <h2 className="text-lg font-bold mb-3">Company Facts</h2>
          <div className="grid grid-cols-2 gap-3 font-mono text-sm">
            {[
              ["Founded", "April 1, 1998"],
              ["Headquarters", "A cupboard, somewhere"],
              ["Employees", "6 teapots"],
              ["Funding", "Series A: Pending (forever)"],
              ["Revenue", "$0 (consistent YoY)"],
              ["Products", "1 (it refuses coffee)"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-theme-border bg-surface p-3">
                <div className="text-xs text-muted-more">{label}</div>
                <div className="text-fg font-medium mt-0.5">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Team */}
        <section>
          <h2 className="text-lg font-bold mb-3">The Team</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-lg border border-theme-border bg-surface p-4">
                <div className="text-2xl mb-2">🫖</div>
                <h3 className="text-sm font-bold text-fg">{member.name}</h3>
                <div className="text-xs text-tea-amber font-mono">{member.title}</div>
                <p className="text-xs text-muted mt-2 font-mono">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-lg font-bold mb-3">Our Values</h2>
          <div className="space-y-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="rounded-lg border border-theme-border bg-surface p-4 flex gap-4">
                <span className="text-lg font-bold text-tea-amber font-mono shrink-0">{i + 1}.</span>
                <div>
                  <h3 className="text-sm font-bold text-fg">{v.title}</h3>
                  <p className="text-xs text-muted mt-1 font-mono">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Careers */}
        <section className="text-center py-4">
          <h2 className="text-lg font-bold mb-2">Careers</h2>
          <p className="text-sm text-muted font-mono">
            We&apos;re always looking for talented teapots. Unfortunately, you&apos;re probably not a teapot.
          </p>
          <p className="text-xs text-muted-more font-mono mt-2">
            If you are a teapot, please submit your résumé to /dev/null.
          </p>
        </section>
      </div>
    </main>
  );
}
