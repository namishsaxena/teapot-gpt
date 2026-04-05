"use client";

import { useState, useEffect } from "react";

interface InlineSubmitProps {
  prompt: string;
  responseSnippet: string;
  onSubmit: (baristaName: string) => Promise<boolean>;
}

export function InlineSubmit({ prompt, responseSnippet, onSubmit }: InlineSubmitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [baristaName, setBaristaName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("barista_name");
    if (saved) setBaristaName(saved);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const name = baristaName.trim() || "Anonymous Barista";
    if (baristaName.trim()) {
      localStorage.setItem("barista_name", baristaName.trim());
    }

    const success = await onSubmit(name);
    setIsSubmitting(false);
    if (success) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-tea-amber/30 bg-tea-amber/5 p-3 text-center animate-fade-in">
        <p className="text-sm text-tea-amber font-mono">
          Your failure has been immortalized on the Spillboard.
        </p>
        <a href="/spillboard" className="text-xs text-muted hover:text-tea-amber font-mono mt-1 inline-block">
          View the Spillboard &rarr;
        </a>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg border border-dashed border-tea-amber/30 bg-tea-amber/5 px-4 py-2.5 text-sm font-mono text-tea-amber hover:bg-tea-amber/10 transition-colors animate-fade-in"
      >
        Nice failure. Spill it? 🫖
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-tea-amber/30 bg-tea-amber/5 p-3 space-y-2 animate-fade-in">
      <div className="text-xs font-mono text-muted truncate">
        &quot;{prompt.slice(0, 80)}{prompt.length > 80 ? "..." : ""}&quot;
      </div>
      <label htmlFor="inline-barista-name" className="sr-only">Barista Name</label>
      <input
        id="inline-barista-name"
        type="text"
        value={baristaName}
        onChange={(e) => setBaristaName(e.target.value)}
        placeholder="Barista Name (optional)"
        maxLength={30}
        className="w-full rounded-lg border border-theme-border bg-bg px-3 py-1.5 text-sm font-mono text-fg placeholder-muted-more focus:border-tea-amber focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-br from-tea-amber to-tea-amber-hover px-3 py-1.5 text-sm font-bold text-black hover:brightness-110 disabled:opacity-50 transition-all"
      >
        {isSubmitting ? "Spilling..." : "Spill It 🫖"}
      </button>
    </form>
  );
}
