"use client";

import { StatusBadge } from "./StatusBadge";
import { InlineSubmit } from "./InlineSubmit";

interface ResponseAreaProps {
  displayText: string;
  isStreaming: boolean;
  isThinking: boolean;
  thinkingMessage: string;
  showBadge: boolean;
  lastPrompt?: string;
  onSpillSubmit?: (baristaName: string, prompt?: string, response?: string) => Promise<boolean>;
}

export function ResponseArea({
  displayText,
  isStreaming,
  isThinking,
  thinkingMessage,
  showBadge,
  lastPrompt,
  onSpillSubmit,
}: ResponseAreaProps) {
  if (!isThinking && !isStreaming && !displayText) return null;

  return (
    <div className="w-full space-y-3">
      <div className="w-full rounded-lg border border-theme-border bg-surface p-5 animate-fade-in" role="status" aria-live="polite">
        {isThinking && (
          <div className="flex items-center gap-3 text-muted">
            <svg className="w-4 h-4 animate-spin-slow text-tea-amber" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-mono">{thinkingMessage}</span>
          </div>
        )}

        {(isStreaming || displayText) && !isThinking && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-more font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tea-amber" />
              TeaPot-418-Turbo
            </div>
            <p className={`font-mono text-sm leading-relaxed text-fg/85 ${isStreaming ? "typing-cursor" : ""}`}>
              {displayText}
            </p>
            {showBadge && !isStreaming && <StatusBadge />}
          </div>
        )}
      </div>

      {showBadge && !isStreaming && lastPrompt && onSpillSubmit && (
        <InlineSubmit
          prompt={lastPrompt}
          responseSnippet={displayText.split(".")[0] + "."}
          onSubmit={onSpillSubmit}
        />
      )}
    </div>
  );
}
