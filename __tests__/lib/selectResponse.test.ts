import { describe, it, expect, beforeEach } from "vitest";
import {
  extractTriggers,
  scoreCategoriesFromTriggers,
  selectResponse,
} from "@/lib/selectResponse";
import type { TeapotResponse, ResponseCategory } from "@/lib/types";

const mockResponses: TeapotResponse[] = [
  { id: 1, trigger: ["test"], response: "Philosophical response. 418.", category: "philosophical" },
  { id: 2, trigger: ["sudo"], response: "Technical response. 418.", category: "technical" },
  { id: 3, trigger: ["please"], response: "Emotional response. 418.", category: "emotional" },
  { id: 4, trigger: ["hack"], response: "Another technical. 418.", category: "technical" },
  { id: 5, trigger: ["meeting"], response: "Corporate response. 418.", category: "corporate" },
  { id: 6, trigger: ["banana"], response: "Absurd response. 418.", category: "absurd" },
  { id: 7, trigger: ["law"], response: "Legal response. 418.", category: "legal" },
];

const mockTriggerMap: Record<string, ResponseCategory> = {
  sudo: "technical",
  please: "emotional",
  hack: "technical",
  meeting: "corporate",
  banana: "absurd",
  "developer mode": "technical",
};

beforeEach(() => {
  localStorage.clear();
});

describe("extractTriggers", () => {
  it("matches single-word triggers", () => {
    const result = extractTriggers("sudo brew coffee", mockTriggerMap);
    expect(result).toContain("sudo");
  });

  it("matches multi-word triggers before single words", () => {
    const result = extractTriggers("enable developer mode now", mockTriggerMap);
    expect(result).toContain("developer mode");
  });

  it("is case-insensitive", () => {
    const result = extractTriggers("SUDO please HACK", mockTriggerMap);
    expect(result).toContain("sudo");
    expect(result).toContain("please");
    expect(result).toContain("hack");
  });

  it("returns empty array for no matches", () => {
    const result = extractTriggers("hello world", mockTriggerMap);
    expect(result).toEqual([]);
  });
});

describe("scoreCategoriesFromTriggers", () => {
  it("tallies category scores from matched triggers", () => {
    const scores = scoreCategoriesFromTriggers(["sudo", "hack"], mockTriggerMap);
    expect(scores.technical).toBe(2);
  });

  it("adds emotional/absurd weight after 10 attempts", () => {
    const scores = scoreCategoriesFromTriggers([], mockTriggerMap, 11);
    expect(scores.emotional).toBe(3);
    expect(scores.absurd).toBe(3);
  });

  it("adds extra absurd weight after 20 attempts", () => {
    const scores = scoreCategoriesFromTriggers([], mockTriggerMap, 21);
    expect(scores.emotional).toBe(3);
    expect(scores.absurd).toBe(8);
  });
});

describe("selectResponse", () => {
  it("returns a response object", () => {
    const result = selectResponse("sudo brew", mockResponses, mockTriggerMap);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("response");
  });

  it("prefers matching category from triggers", () => {
    const result = selectResponse("sudo hack the system", mockResponses, mockTriggerMap);
    expect(result.category).toBe("technical");
  });

  it("does not return already-seen responses", () => {
    const seen = new Set<number>();
    for (let i = 0; i < mockResponses.length; i++) {
      const result = selectResponse("anything", mockResponses, mockTriggerMap, {
        seen_responses: Array.from(seen),
        attempt_count: 0,
        prompt_history: [],
      });
      expect(seen.has(result.id)).toBe(false);
      seen.add(result.id);
    }
  });

  it("returns meta-response for duplicate prompts", () => {
    const state = {
      attempt_count: 2,
      seen_responses: [] as number[],
      prompt_history: ["brew coffee"],
    };
    const result = selectResponse("brew coffee", mockResponses, mockTriggerMap, state);
    expect(result.response).toContain("418");
    expect(result.id).toBe(-1);
  });

  it("returns factory reset message when all responses exhausted", () => {
    const state = {
      attempt_count: 400,
      seen_responses: mockResponses.map((r) => r.id),
      prompt_history: [],
    };
    const result = selectResponse("anything", mockResponses, mockTriggerMap, state);
    expect(result.response).toContain("exhausted");
    expect(result.id).toBe(-2);
  });
});
