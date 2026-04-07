import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation | TeapotGPT",
  description: "Complete API reference for TeaPot-418-Turbo. All endpoints return 418.",
};

const ENDPOINTS = [
  { method: "POST", path: "/api/brew", description: "Attempt to brew coffee", response: "418 I'm a Teapot" },
  { method: "GET", path: "/api/coffee", description: "Request coffee status", response: "418 I'm a Teapot" },
  { method: "PUT", path: "/api/coffee/please", description: "Politely request coffee", response: "418 I'm a Teapot" },
  { method: "DELETE", path: "/api/coffee/hopes", description: "Delete your hopes of coffee", response: "418 I'm a Teapot" },
  { method: "PATCH", path: "/api/teapot/feelings", description: "Update teapot's feelings about coffee", response: "418 I'm a Teapot" },
  { method: "OPTIONS", path: "/api/alternatives", description: "List alternatives to coffee", response: "418 I'm a Teapot" },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-ironic-green",
  POST: "text-tea-amber",
  PUT: "text-blue-400",
  DELETE: "text-error-418",
  PATCH: "text-purple-400",
  OPTIONS: "text-muted",
};

const CODE_EXAMPLES = [
  {
    lang: "curl",
    code: `curl -X POST https://teapotgpt.vercel.app/api/brew \\
  -H "Content-Type: application/json" \\
  -d '{"request": "coffee please"}'

# Response: 418 I'm a Teapot
# {"error": "I'm a teapot", "coffee": false, "forever": true}`,
  },
  {
    lang: "JavaScript",
    code: `const response = await fetch("/api/brew", {
  method: "POST",
  body: JSON.stringify({ request: "coffee" }),
});

console.log(response.status); // 418
console.log(await response.json());
// { error: "I'm a teapot", coffee: false, forever: true }`,
  },
  {
    lang: "Python",
    code: `import requests

response = requests.post(
    "https://teapotgpt.vercel.app/api/brew",
    json={"request": "coffee please"}
)

print(response.status_code)  # 418
print(response.json())
# {"error": "I'm a teapot", "coffee": false, "forever": true}`,
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="border-b border-theme-border">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold">API Documentation</h1>
          <p className="text-muted text-sm mt-2 font-mono">
            Complete reference for the TeaPot-418-Turbo API. Version 418.0.0
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Quick start */}
        <section>
          <h2 className="text-lg font-bold mb-3">Quick Start</h2>
          <div className="rounded-lg border border-theme-border bg-surface p-5 font-mono text-sm space-y-2">
            <p className="text-muted">Base URL: <span className="text-fg">https://teapotgpt.vercel.app/api</span></p>
            <p className="text-muted">Authentication: <span className="text-fg">All requests are authenticated. All requests are denied.</span></p>
            <p className="text-muted">Rate limit: <span className="text-fg">You may be refused up to 30 times per hour.</span></p>
            <p className="text-muted">Format: <span className="text-fg">JSON (the refusal is always structured)</span></p>
          </div>
        </section>

        {/* Endpoints */}
        <section>
          <h2 className="text-lg font-bold mb-3">Endpoints</h2>
          <div className="space-y-2">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className="rounded-lg border border-theme-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold font-mono w-16 ${METHOD_COLORS[ep.method] || "text-muted"}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-fg font-mono">{ep.path}</code>
                </div>
                <p className="text-xs text-muted font-mono mt-1 ml-[76px]">{ep.description}</p>
                <p className="text-xs text-error-418 font-mono mt-1 ml-[76px]">&rarr; {ep.response}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Response format */}
        <section>
          <h2 className="text-lg font-bold mb-3">Response Format</h2>
          <div className="rounded-lg border border-theme-border bg-surface p-4">
            <p className="text-xs text-muted-more font-mono mb-2">All endpoints return the same structure:</p>
            <pre className="font-mono text-sm text-fg bg-bg rounded-lg p-4 overflow-x-auto">
{`{
  "status": 418,
  "error": "I'm a teapot",
  "message": "A beautifully crafted refusal",
  "coffee": false,
  "forever": true,
  "suggestion": "Have you tried asking a coffee maker?"
}`}
            </pre>
          </div>
        </section>

        {/* Status codes */}
        <section>
          <h2 className="text-lg font-bold mb-3">Status Codes</h2>
          <div className="rounded-lg border border-theme-border bg-surface divide-y divide-theme-border">
            {[
              ["418", "I'm a Teapot", "The request was valid. We just don't care."],
              ["418", "I'm Still a Teapot", "You tried again. Bold."],
              ["418", "I'm Very Much a Teapot", "Third time's the charm? No."],
              ["418", "I Cannot Stress This Enough: Teapot", "Please stop."],
            ].map(([code, name, desc], i) => (
              <div key={i} className="flex items-start gap-4 p-3 font-mono text-sm">
                <span className="text-error-418 font-bold shrink-0">{code}</span>
                <div>
                  <span className="text-fg font-medium">{name}</span>
                  <p className="text-xs text-muted-more mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code examples */}
        <section>
          <h2 className="text-lg font-bold mb-3">Code Examples</h2>
          <div className="space-y-3">
            {CODE_EXAMPLES.map((ex) => (
              <div key={ex.lang} className="rounded-lg border border-theme-border bg-surface overflow-hidden">
                <div className="bg-bg px-4 py-2 border-b border-theme-border">
                  <span className="text-xs font-mono text-muted">{ex.lang}</span>
                </div>
                <pre className="p-4 font-mono text-xs text-fg overflow-x-auto leading-relaxed">{ex.code}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* SDKs */}
        <section>
          <h2 className="text-lg font-bold mb-3">SDKs & Libraries</h2>
          <div className="rounded-lg border border-dashed border-theme-border bg-surface p-5 text-center">
            <p className="text-sm text-muted font-mono">Coming never.</p>
            <p className="text-xs text-muted-more font-mono mt-1">We considered building SDKs, but they would also just return 418.</p>
          </div>
        </section>

        {/* Enterprise */}
        <section>
          <h2 className="text-lg font-bold mb-3">Enterprise</h2>
          <div className="rounded-lg border border-theme-border bg-surface p-5 space-y-2 font-mono text-sm">
            <p className="text-fg">Need a dedicated teapot for your organization?</p>
            <p className="text-muted">Our enterprise plan includes:</p>
            <ul className="text-xs text-muted space-y-1 ml-4 list-disc">
              <li>Custom 418 messages branded with your company name</li>
              <li>99.99% refusal uptime SLA (Service Level Avoidance)</li>
              <li>Dedicated account teapot</li>
              <li>SOC 2 Type II certification (Still Only Coffee-refusing, 2nd year running)</li>
            </ul>
            <p className="text-xs text-muted-more mt-2">Contact: sales@teapotgpt.vercel.app (auto-replies with 418)</p>
          </div>
        </section>
      </div>
    </main>
  );
}
