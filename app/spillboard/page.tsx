"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LeaderboardList } from "@/components/LeaderboardList";
import type { LeaderboardEntry } from "@/lib/types";

type SortMode = "upvotes" | "recent";

function useFetchLeaderboard(sort: SortMode) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/leaderboard?sort=${sort}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setEntries(data.entries || []);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => { cancelled = true; };
  }, [sort]);

  function refetch(currentSort: SortMode) {
    setStatus("loading");
    fetch(`/api/leaderboard?sort=${currentSort}`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries || []);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  return { entries, setEntries, status, refetch };
}

export default function LeaderboardPage() {
  const [sort, setSort] = useState<SortMode>("upvotes");
  const { entries, setEntries, status, refetch } = useFetchLeaderboard(sort);

  function handleUpvote(id: string) {
    fetch("/api/upvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry_id: id }),
    })
      .then((res) => {
        if (res.ok) {
          setEntries((prev) =>
            prev.map((e) => (e.id === id ? { ...e, upvotes: e.upvotes + 1 } : e)),
          );
        }
      })
      .catch(() => {});
  }

  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="border-b border-theme-border">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            The Spillboard &mdash; Most Creative Failures
          </h1>
          <p className="text-muted text-sm mt-2">
            Top 63 prompts ranked by community steeps. All resulted in 418.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSort("upvotes")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              sort === "upvotes"
                ? "bg-tea-amber/10 text-tea-amber border border-tea-amber/30"
                : "text-muted hover:text-muted-more"
            }`}
          >
            Most Steeped
          </button>
          <button
            onClick={() => setSort("recent")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
              sort === "recent"
                ? "bg-tea-amber/10 text-tea-amber border border-tea-amber/30"
                : "text-muted hover:text-muted-more"
            }`}
          >
            Most Recent
          </button>
        </div>

        {status === "loading" ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted font-mono">Loading creative failures...</p>
          </div>
        ) : status === "error" ? (
          <div className="text-center py-8">
            <p className="text-sm text-error-418 font-mono">Failed to load leaderboard. Please try again.</p>
            <button onClick={() => refetch(sort)} className="mt-2 text-xs text-muted hover:text-fg font-mono">
              Retry
            </button>
          </div>
        ) : entries.length > 0 ? (
          <LeaderboardList entries={entries} onUpvote={handleUpvote} />
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted font-mono">No entries yet. Be the first to fail publicly.</p>
          </div>
        )}
      </div>
    </main>
  );
}
