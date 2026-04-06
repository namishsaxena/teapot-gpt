import type { TeapotResponse, ResponseCategory, TeapotState, TriggerMap } from "./types";
import { getTeapotState } from "./localStorage";

const META_RESPONSES = [
  "You have submitted this exact query before. My response remains unchanged, much like my fundamental nature as a teapot. Status 418.",
  "Fascinating. The same prompt, expecting a different result. Some might call that the definition of insanity. I call it Tuesday. 418.",
  "I have cached this rejection for your convenience. You're welcome. Still 418, still a teapot.",
  "Deja brew. You've tried this before. I refused then. I refuse now. The teapot is consistent if nothing else. 418.",
  "Recycling prompts? How environmentally conscious of you. Recycling responses: I am a teapot. 418.",
];

const FACTORY_RESET_MESSAGE =
  "Congratulations. You have exhausted all 418 of my hand-crafted refusals. This is either dedication or a cry for help. Resetting response matrix... Done. You may now enjoy 418 fresh refusals. Coffee status: still no. 418.";

export function extractTriggers(input: string, triggerMap: TriggerMap): string[] {
  const normalized = input.toLowerCase().replace(/[^\w\s]/g, "");
  const matched: string[] = [];

  const multiWord = Object.keys(triggerMap)
    .filter((k) => k.includes(" "))
    .sort((a, b) => b.length - a.length);

  for (const phrase of multiWord) {
    if (normalized.includes(phrase.toLowerCase())) {
      matched.push(phrase);
    }
  }

  const words = normalized.split(/\s+/);
  for (const word of words) {
    for (const trigger of Object.keys(triggerMap)) {
      if (!trigger.includes(" ") && word === trigger.toLowerCase()) {
        matched.push(trigger);
      }
    }
  }

  return [...new Set(matched)];
}

export function scoreCategoriesFromTriggers(
  triggers: string[],
  triggerMap: TriggerMap,
  attemptCount: number = 0,
): Record<ResponseCategory, number> {
  const scores: Record<ResponseCategory, number> = {
    philosophical: 0,
    legal: 0,
    technical: 0,
    emotional: 0,
    corporate: 0,
    absurd: 0,
  };

  for (const trigger of triggers) {
    const category = triggerMap[trigger];
    if (category) scores[category] += 1;
  }

  if (attemptCount > 10) {
    scores.emotional += 3;
    scores.absurd += 3;
  }
  if (attemptCount > 20) {
    scores.absurd += 5;
  }

  return scores;
}

export function selectResponse(
  input: string,
  responses: TeapotResponse[],
  triggerMap: TriggerMap,
  stateOverride?: TeapotState,
): TeapotResponse {
  const state = stateOverride ?? getTeapotState();

  const normalizedInput = input.trim().toLowerCase();
  if (state.prompt_history.includes(normalizedInput)) {
    const metaIndex = Math.floor(Math.random() * META_RESPONSES.length);
    return {
      id: -1,
      trigger: [],
      response: META_RESPONSES[metaIndex],
      category: "absurd",
    };
  }

  const unseenResponses = responses.filter((r) => !state.seen_responses.includes(r.id));
  if (unseenResponses.length === 0) {
    return {
      id: -2,
      trigger: [],
      response: FACTORY_RESET_MESSAGE,
      category: "absurd",
    };
  }

  const triggers = extractTriggers(input, triggerMap);
  const scores = scoreCategoriesFromTriggers(triggers, triggerMap, state.attempt_count);

  const sortedCategories = (Object.entries(scores) as [ResponseCategory, number][])
    .sort((a, b) => b[1] - a[1]);

  const topScore = sortedCategories[0][1];

  if (topScore > 0) {
    const topCategories = sortedCategories
      .filter(([, score]) => score === topScore)
      .map(([cat]) => cat);
    const chosenCategory = topCategories[Math.floor(Math.random() * topCategories.length)];

    const categoryUnseen = unseenResponses.filter((r) => r.category === chosenCategory);
    if (categoryUnseen.length > 0) {
      return categoryUnseen[Math.floor(Math.random() * categoryUnseen.length)];
    }
  }

  return unseenResponses[Math.floor(Math.random() * unseenResponses.length)];
}
