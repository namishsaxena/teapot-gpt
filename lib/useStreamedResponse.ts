"use client";

import { useState, useCallback, useRef } from "react";

const THINKING_MESSAGES = [
  "Steeping your request...",
  "Consulting the leaves...",
  "Warming up the model (it's a teapot, this takes a while)",
  "Cross-referencing with RFC 2324...",
  "Running sentiment analysis on your desperation level...",
];

function chunkText(text: string): string[] {
  const words = text.split(/(\s+)/);
  const chunks: string[] = [];
  let current = "";

  for (const word of words) {
    if (word.trim() === "") {
      current += word;
      continue;
    }
    current += word;
    const wordCount = current.trim().split(/\s+/).length;
    if (wordCount >= 1 + Math.floor(Math.random() * 2)) {
      chunks.push(current);
      current = "";
    }
  }
  if (current.trim()) chunks.push(current);
  return chunks;
}

function getChunkDelay(chunk: string, index: number, total: number): number {
  let delay = 30 + Math.random() * 50;
  if (index < 3) delay *= 0.7;
  if (/[.,:;—]/.test(chunk)) delay += 50 + Math.random() * 50;
  if (index === total - 1 && (/418/.test(chunk) || /teapot/i.test(chunk))) {
    delay = 418;
  }
  return delay;
}

export function useStreamedResponse(onComplete: () => void) {
  const [displayText, setDisplayText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  }, []);

  const start = useCallback((text: string) => {
    if (!text) return;
    cleanup();
    setDisplayText("");
    setIsStreaming(false);

    setThinkingMessage(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)]);
    setIsThinking(true);

    const thinkingDuration = 1500 + Math.random() * 1000;

    const thinkTimeout = setTimeout(() => {
      setIsThinking(false);
      setIsStreaming(true);

      const chunks = chunkText(text);

      const pauseCount = 1 + Math.floor(Math.random() * 2);
      const pausePositions = new Set<number>();
      while (pausePositions.size < pauseCount && chunks.length > 2) {
        const pos = 1 + Math.floor(Math.random() * (chunks.length - 2));
        pausePositions.add(pos);
      }

      let accumulated = "";
      let totalDelay = 0;

      chunks.forEach((chunk, i) => {
        if (pausePositions.has(i)) {
          totalDelay += 200 + Math.random() * 200;
        }

        totalDelay += getChunkDelay(chunk, i, chunks.length);

        const t = setTimeout(() => {
          accumulated += chunk;
          setDisplayText(accumulated);

          if (i === chunks.length - 1) {
            setIsStreaming(false);
            onComplete();
          }
        }, totalDelay);

        timeoutRef.current.push(t);
      });
    }, thinkingDuration);

    timeoutRef.current.push(thinkTimeout);
  }, [onComplete, cleanup]);

  return { displayText, isStreaming, isThinking, thinkingMessage, start };
}
