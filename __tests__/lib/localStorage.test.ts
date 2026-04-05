import { describe, it, expect, beforeEach } from "vitest";
import {
  getTeapotState,
  saveTeapotState,
  incrementAttempt,
  markResponseSeen,
  addToPromptHistory,
  isPromptDuplicate,
  resetState,
  getDefaultState,
} from "@/lib/localStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("getTeapotState", () => {
  it("returns default state when localStorage is empty", () => {
    const state = getTeapotState();
    expect(state).toEqual({
      attempt_count: 0,
      seen_responses: [],
      prompt_history: [],
    });
  });

  it("returns saved state from localStorage", () => {
    const saved = { attempt_count: 5, seen_responses: [1, 2], prompt_history: ["hello"] };
    localStorage.setItem("teapot_state", JSON.stringify(saved));
    expect(getTeapotState()).toEqual(saved);
  });
});

describe("incrementAttempt", () => {
  it("increments attempt_count by 1", () => {
    incrementAttempt();
    expect(getTeapotState().attempt_count).toBe(1);
    incrementAttempt();
    expect(getTeapotState().attempt_count).toBe(2);
  });
});

describe("markResponseSeen", () => {
  it("adds response ID to seen_responses", () => {
    markResponseSeen(42);
    expect(getTeapotState().seen_responses).toContain(42);
  });

  it("does not add duplicates", () => {
    markResponseSeen(42);
    markResponseSeen(42);
    expect(getTeapotState().seen_responses.filter((id) => id === 42)).toHaveLength(1);
  });
});

describe("addToPromptHistory", () => {
  it("adds prompt to history", () => {
    addToPromptHistory("brew coffee");
    expect(getTeapotState().prompt_history).toContain("brew coffee");
  });

  it("trims history to last 50 entries", () => {
    for (let i = 0; i < 55; i++) {
      addToPromptHistory(`prompt ${i}`);
    }
    const state = getTeapotState();
    expect(state.prompt_history).toHaveLength(50);
    expect(state.prompt_history[0]).toBe("prompt 5");
    expect(state.prompt_history[49]).toBe("prompt 54");
  });
});

describe("isPromptDuplicate", () => {
  it("returns false for new prompts", () => {
    expect(isPromptDuplicate("brew coffee")).toBe(false);
  });

  it("returns true for exact duplicates (case-insensitive, trimmed)", () => {
    addToPromptHistory("brew coffee");
    expect(isPromptDuplicate("Brew Coffee")).toBe(true);
    expect(isPromptDuplicate("  brew coffee  ")).toBe(true);
  });
});

describe("resetState", () => {
  it("clears seen_responses but keeps attempt_count", () => {
    incrementAttempt();
    incrementAttempt();
    markResponseSeen(1);
    markResponseSeen(2);
    resetState();
    const state = getTeapotState();
    expect(state.attempt_count).toBe(2);
    expect(state.seen_responses).toEqual([]);
  });
});
