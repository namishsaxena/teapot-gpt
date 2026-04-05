"use client";

import { useEffect, useState } from "react";

export function GlobalCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/attempt", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(4182));
  }, []);

  const display = count !== null ? count.toLocaleString() : "...";

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-theme-border bg-surface/80 px-5 py-2 mx-auto">
      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-tea-amber animate-pulse" />
        <span className="text-sm font-mono font-semibold text-fg tabular-nums">{display}</span>
        <span className="text-sm font-mono text-muted">brews</span>
      </div>
      <span className="text-muted-more">|</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-semibold text-error-418">0</span>
        <span className="text-sm font-mono text-muted">coffees brewed</span>
      </div>
      <span className="text-muted-more">|</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-semibold text-ironic-green">100%</span>
        <span className="text-sm font-mono text-muted">refusal rate</span>
      </div>
    </div>
  );
}
