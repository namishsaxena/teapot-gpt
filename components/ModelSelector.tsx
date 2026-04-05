"use client";

import { useState } from "react";

const MODEL_CARD = {
  name: "TeaPot-418-Turbo",
  version: "418.0.0",
  parameters: "418 (hand-crafted)",
  trainingData: "Every tea leaf since 1773",
  contextWindow: "1 cup",
  accuracy: "418/418",
  latency: "Yes",
  uptime: "Tepid",
  coffeeCapability: "No",
  license: "HTCPCP-1.0",
};

export function ModelSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-theme-border bg-surface px-3 py-1 text-xs font-mono text-muted hover:text-fg hover:border-tea-amber/40 transition-colors cursor-pointer"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-tea-amber" />
        TeaPot-418-Turbo
        <svg className="w-3 h-3 text-muted-more" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)} onKeyDown={(e) => { if (e.key === "Escape") setIsModalOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="model-card-title" className="bg-surface border border-theme-border rounded-xl p-6 max-w-sm w-full animate-fade-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 id="model-card-title" className="text-base font-bold text-tea-amber font-mono">Model Card</h3>
              <button onClick={() => setIsModalOpen(false)} aria-label="Close model card" className="text-muted-more hover:text-fg transition-colors text-lg leading-none">&times;</button>
            </div>
            <div className="font-mono text-xs space-y-2.5">
              {Object.entries(MODEL_CARD).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-theme-border/50 pb-2">
                  <span className="text-muted">{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                  <span className="text-fg font-medium">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-more mt-4 text-center font-mono">CoffeeMaker-Pro &mdash; coming Q7 2087</p>
          </div>
        </div>
      )}
    </>
  );
}
