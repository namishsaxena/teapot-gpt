"use client";

import { useState, useEffect } from "react";

interface Attempt {
  prompt: string;
  response: string;
}

interface AttemptHistoryProps {
  attempts: Attempt[];
  onSpillSubmit?: (baristaName: string, prompt?: string, response?: string) => Promise<boolean>;
  onClear?: () => void;
}

export function AttemptHistory({ attempts, onSpillSubmit, onClear }: AttemptHistoryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [spillingIndex, setSpillingIndex] = useState<number | null>(null);
  const [baristaName, setBaristaName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spilledIndices, setSpilledIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("barista_name");
    if (saved) setBaristaName(saved);
  }, []);

  if (attempts.length === 0) return null;

  async function handleSpill(index: number) {
    if (!onSpillSubmit || isSubmitting) return;
    setIsSubmitting(true);

    const name = baristaName.trim() || "Anonymous Barista";
    if (baristaName.trim()) {
      localStorage.setItem("barista_name", baristaName.trim());
    }

    const attempt = attempts[index];
    const success = await onSpillSubmit(name, attempt.prompt, attempt.response);
    setIsSubmitting(false);
    if (success) {
      setSpilledIndices((prev) => new Set(prev).add(index));
      setSpillingIndex(null);
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono text-muted-more uppercase tracking-wider">
          Incident Reports ({attempts.length})
        </h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-xs font-mono text-muted-more hover:text-error-418 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {attempts.map((attempt, i) => {
          const isExpanded = expandedIndex === i;
          const isSpilling = spillingIndex === i;
          const isSpilled = spilledIndices.has(i);
          const firstLine = attempt.response.split(".")[0] + ".";
          return (
            <div key={i} className="rounded-lg border border-theme-border/50 bg-surface/50 overflow-hidden transition-colors">
              <button
                onClick={() => {
                  setExpandedIndex(isExpanded ? null : i);
                  if (isExpanded) setSpillingIndex(null);
                }}
                aria-expanded={isExpanded}
                className="w-full text-left px-4 py-3 hover:bg-surface/80 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-tea-amber font-mono truncate">INC-{String(attempts.length - i).padStart(3, "0")} &gt; {attempt.prompt}</p>
                    <p className={`text-xs text-muted-more font-mono mt-1 ${isExpanded ? "" : "truncate"}`}>
                      {isExpanded ? attempt.response : firstLine}
                    </p>
                  </div>
                  <span className="text-xs text-error-418 font-mono shrink-0">418</span>
                </div>
              </button>

              {/* Spill CTA for expanded entries */}
              {isExpanded && onSpillSubmit && (
                <div className="px-4 pb-3 pt-1">
                  {isSpilled ? (
                    <p className="text-xs text-tea-amber font-mono">Spilled to the Spillboard ✓</p>
                  ) : isSpilling ? (
                    <div className="flex items-center gap-2">
                      <label htmlFor={`barista-${i}`} className="sr-only">Barista Name</label>
                      <input
                        id={`barista-${i}`}
                        type="text"
                        value={baristaName}
                        onChange={(e) => setBaristaName(e.target.value)}
                        placeholder="Barista Name (optional)"
                        maxLength={30}
                        className="flex-1 rounded-lg border border-theme-border bg-bg px-2 py-1 text-xs font-mono text-fg placeholder-muted-more focus:border-tea-amber focus:outline-none"
                      />
                      <button
                        onClick={() => handleSpill(i)}
                        disabled={isSubmitting}
                        className="rounded-lg bg-gradient-to-br from-tea-amber to-tea-amber-hover px-3 py-1 text-xs font-bold text-black hover:brightness-110 disabled:opacity-50 transition-all shrink-0"
                      >
                        {isSubmitting ? "..." : "Spill It 🫖"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSpillingIndex(i);
                      }}
                      className="rounded-lg border border-dashed border-tea-amber/40 bg-tea-amber/5 px-3 py-1.5 text-xs font-mono font-medium text-tea-amber hover:bg-tea-amber/10 hover:border-tea-amber/60 transition-colors"
                    >
                      Spill It 🫖
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
