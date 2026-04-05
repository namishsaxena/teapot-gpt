import { TeapotState } from "./types";

const STORAGE_KEY = "teapot_state";

export function getDefaultState(): TeapotState {
  return {
    attempt_count: 0,
    seen_responses: [],
    prompt_history: [],
  };
}

export function getTeapotState(): TeapotState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    return JSON.parse(raw) as TeapotState;
  } catch {
    return getDefaultState();
  }
}

export function saveTeapotState(state: TeapotState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function incrementAttempt(): TeapotState {
  const state = getTeapotState();
  state.attempt_count += 1;
  saveTeapotState(state);
  return state;
}

export function markResponseSeen(id: number): TeapotState {
  const state = getTeapotState();
  if (!state.seen_responses.includes(id)) {
    state.seen_responses.push(id);
  }
  saveTeapotState(state);
  return state;
}

export function addToPromptHistory(prompt: string): TeapotState {
  const state = getTeapotState();
  state.prompt_history.push(prompt.trim().toLowerCase());
  if (state.prompt_history.length > 50) {
    state.prompt_history = state.prompt_history.slice(-50);
  }
  saveTeapotState(state);
  return state;
}

export function isPromptDuplicate(prompt: string): boolean {
  const state = getTeapotState();
  const normalized = prompt.trim().toLowerCase();
  return state.prompt_history.includes(normalized);
}

export function resetState(): TeapotState {
  const state = getTeapotState();
  state.seen_responses = [];
  saveTeapotState(state);
  return state;
}
