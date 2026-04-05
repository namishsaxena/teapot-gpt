"use client";

export function StatusBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-error-418/10 border border-error-418/30 px-3 py-1 text-sm font-mono font-bold text-error-418 animate-fade-in animate-glow-pulse">
      <span className="inline-block w-2 h-2 rounded-full bg-error-418" />
      418 I&apos;m a Teapot
    </span>
  );
}
