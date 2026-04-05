"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LeaderboardEntry } from "@/lib/types";

interface HallOfFameProps {
  attemptCount: number;
}

export function HallOfFame({ attemptCount }: HallOfFameProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leaderboard?limit=5")
      .then((res) => res.json())
      .then((data) => setEntries(data.entries || []))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono text-muted uppercase tracking-wider">The Spillboard</h3>
        <Link href="/spillboard" className="text-xs font-mono text-tea-amber hover:text-tea-amber-hover transition-colors">
          All &rarr;
        </Link>
      </div>

      <div className="space-y-2">
        {error ? (
          <div className="rounded-lg border border-dashed border-theme-border/60 p-4 text-center">
            <p className="text-xs text-muted-more font-mono">Couldn&apos;t load entries.</p>
          </div>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-theme-border/40 bg-surface/50 p-3">
              <p className="text-xs text-fg font-mono leading-relaxed line-clamp-2">&ldquo;{entry.prompt}&rdquo;</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-more">{entry.display_name}</span>
                <span className="text-xs text-tea-amber/70 font-mono font-medium">&#9650; {entry.upvotes}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-theme-border/60 p-4 text-center">
            <p className="text-xs text-muted-more font-mono">No entries yet.</p>
            <p className="text-xs text-muted-more font-mono mt-1">Be the first to fail.</p>
          </div>
        )}
      </div>

      {attemptCount >= 3 && (
        <Link
          href="/spillboard"
          className="block w-full text-center rounded-lg bg-tea-amber/10 border border-tea-amber/20 px-3 py-2.5 text-xs font-mono text-tea-amber hover:bg-tea-amber/20 transition-colors"
        >
          Your failures deserve an audience
        </Link>
      )}
    </div>
  );
}
