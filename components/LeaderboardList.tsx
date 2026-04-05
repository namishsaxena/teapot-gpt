"use client";

import { useState } from "react";
import type { LeaderboardEntry } from "@/lib/types";

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
  onUpvote: (id: string) => void;
}

export function LeaderboardList({ entries, onUpvote }: LeaderboardListProps) {
  const [votedIds, setVotedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const saved = localStorage.getItem("teapot_votes");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [steamIds, setSteamIds] = useState<Set<string>>(new Set());

  function handleUpvote(id: string) {
    if (votedIds.has(id)) return;
    const newVoted = new Set(votedIds).add(id);
    setVotedIds(newVoted);
    localStorage.setItem("teapot_votes", JSON.stringify([...newVoted]));

    // Trigger steam animation
    setSteamIds((prev) => new Set(prev).add(id));
    setTimeout(() => setSteamIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    }), 600);

    onUpvote(id);
  }

  const [now] = useState(() => Date.now());

  function timeAgo(timestamp: number): string {
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className="rounded-lg border border-theme-border bg-surface p-4 hover:border-theme-border/80 transition-colors"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl font-bold text-muted-more font-mono w-8 text-right shrink-0">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-fg font-mono">&quot;{entry.prompt}&quot;</p>
              <p className="text-xs text-muted font-mono mt-1 truncate">&rarr; {entry.response_snippet}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-muted">{entry.display_name}</span>
                <span className="text-xs text-muted-more">&bull;</span>
                <span className="text-xs text-muted-more">{timeAgo(entry.timestamp)}</span>
              </div>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={() => handleUpvote(entry.id)}
                disabled={votedIds.has(entry.id)}
                aria-label={votedIds.has(entry.id) ? `Already steeped: ${entry.upvotes} steeps` : `Steep this brew: ${entry.upvotes} steeps`}
                title={votedIds.has(entry.id) ? "Already steeped" : "Steep this brew"}
                className={`steep-wobble relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                  votedIds.has(entry.id)
                    ? "text-tea-amber bg-tea-amber/10"
                    : "text-muted hover:text-tea-amber hover:bg-tea-amber/5"
                }`}
              >
                <span className="steep-icon text-lg transition-transform">🫖</span>
                <span className="text-xs font-mono">{entry.upvotes} steeps</span>
              </button>
              {steamIds.has(entry.id) && (
                <>
                  <span className="steam-particle" style={{ left: "30%" }}>~</span>
                  <span className="steam-particle" style={{ left: "50%", animationDelay: "0.1s" }}>~</span>
                  <span className="steam-particle" style={{ left: "70%", animationDelay: "0.2s" }}>~</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
