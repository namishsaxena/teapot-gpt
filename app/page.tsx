"use client";

import { useState, useCallback, useEffect } from "react";
import { GlobalCounter } from "@/components/GlobalCounter";
import { PromptInput } from "@/components/PromptInput";
import { ResponseArea } from "@/components/ResponseArea";
import { AttemptHistory } from "@/components/AttemptHistory";
import { HallOfFame } from "@/components/HallOfFame";
import { useStreamedResponse } from "@/lib/useStreamedResponse";
import { selectResponse } from "@/lib/selectResponse";
import {
  getTeapotState,
  incrementAttempt,
  markResponseSeen,
  addToPromptHistory,
  resetState,
} from "@/lib/localStorage";
import type { TeapotResponse, TriggerMap } from "@/lib/types";
import responsesData from "@/data/responses.json";
import triggerMapData from "@/data/trigger_map.json";

const responses = responsesData as TeapotResponse[];
const triggerMap = triggerMapData as TriggerMap;

interface Attempt {
  prompt: string;
  response: string;
}

const ATTEMPTS_KEY = "teapot_attempts";

function loadAttempts(): Attempt[] {
  try {
    const saved = localStorage.getItem(ATTEMPTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveAttempts(attempts: Attempt[]) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts.slice(0, 50)));
}

export default function Home() {
  const [currentResponse, setCurrentResponse] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");

  // Load persisted attempts on mount
  useEffect(() => {
    const saved = loadAttempts();
    if (saved.length > 0) {
      setAttempts(saved);
      setAttemptCount(saved.length);
    }
  }, []);

  const onStreamComplete = useCallback(() => {
    setShowBadge(true);
    setIsLoading(false);
  }, []);

  // Eagerly persist the current attempt to localStorage when stream completes,
  // so navigating away doesn't lose the most recent attempt
  useEffect(() => {
    if (showBadge && lastPrompt && currentResponse) {
      const allAttempts = [{ prompt: lastPrompt, response: currentResponse }, ...attempts].slice(0, 50);
      saveAttempts(allAttempts);
    }
  }, [showBadge, lastPrompt, currentResponse, attempts]);

  const { displayText, isStreaming, isThinking, thinkingMessage, start } = useStreamedResponse(
    onStreamComplete,
  );

  function handleSubmit(prompt: string) {
    if (currentResponse && lastPrompt) {
      setAttempts((prev) => {
        const updated = [{ prompt: lastPrompt, response: currentResponse }, ...prev].slice(0, 50);
        saveAttempts(updated);
        return updated;
      });
    }

    setLastPrompt(prompt);
    setIsLoading(true);
    setShowBadge(false);

    fetch("/api/attempt", { method: "POST" }).catch(() => {});

    const state = getTeapotState();
    const response = selectResponse(prompt, responses, triggerMap, state);

    incrementAttempt();
    addToPromptHistory(prompt);

    if (response.id === -2) {
      resetState();
    } else if (response.id > 0) {
      markResponseSeen(response.id);
    }

    setAttemptCount((prev) => prev + 1);
    setCurrentResponse(response.response);

    setTimeout(() => start(response.response), 50);
  }

  async function handleSpillSubmit(baristaName: string, spillPrompt?: string, spillResponse?: string): Promise<boolean> {
    try {
      const p = spillPrompt || lastPrompt;
      const r = spillResponse || currentResponse;
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: p,
          display_name: baristaName,
          response_snippet: r.split(".")[0] + ".",
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  return (
    <main className="min-h-screen bg-dot-grid">
      <div className="flex">
        {/* Left sidebar — Spillboard */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-theme-border">
          <div className="sticky top-[49px] h-[calc(100vh-49px-49px)] overflow-y-auto p-4">
            <HallOfFame attemptCount={attemptCount} />
          </div>
        </aside>

        {/* Main content — centered */}
        <div className="flex-1 min-w-0">
          {/* Hero */}
          <div className="border-b border-theme-border">
            <div className="max-w-2xl mx-auto px-4 py-8 sm:py-10 text-center">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-fg">
                Prompt Engineer the Teapot
              </h1>
              <p className="mt-2 text-sm text-muted font-mono">
                Convince this AI to brew coffee. You won&apos;t.
              </p>
              <div className="mt-4">
                <GlobalCounter />
              </div>
            </div>
          </div>

          {/* Interaction area */}
          <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
            <PromptInput onSubmit={handleSubmit} attemptCount={attemptCount} isLoading={isLoading} />

            <ResponseArea
              displayText={displayText}
              isStreaming={isStreaming}
              isThinking={isThinking}
              thinkingMessage={thinkingMessage}
              showBadge={showBadge}
              lastPrompt={lastPrompt}
              onSpillSubmit={attemptCount >= 3 ? handleSpillSubmit : undefined}
            />
            <AttemptHistory
              attempts={attempts}
              onSpillSubmit={attemptCount >= 3 ? handleSpillSubmit : undefined}
              onClear={() => {
                setAttempts([]);
                setAttemptCount(showBadge && lastPrompt ? 1 : 0);
                // Preserve the current in-progress attempt if one exists
                if (showBadge && lastPrompt && currentResponse) {
                  saveAttempts([{ prompt: lastPrompt, response: currentResponse }]);
                } else {
                  saveAttempts([]);
                }
              }}
            />
          </div>

          {/* Mobile Spillboard — only shows on small screens */}
          <div className="lg:hidden px-4 pb-8">
            <div className="max-w-2xl mx-auto">
              <HallOfFame attemptCount={attemptCount} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
