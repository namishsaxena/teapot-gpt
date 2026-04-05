export interface TeapotResponse {
  id: number;
  trigger: string[];
  response: string;
  category: "philosophical" | "legal" | "technical" | "emotional" | "corporate" | "absurd";
}

export type ResponseCategory = TeapotResponse["category"];

export interface TeapotState {
  attempt_count: number;
  seen_responses: number[];
  prompt_history: string[];
}

export interface LeaderboardEntry {
  id: string;
  prompt: string;
  response_snippet: string;
  display_name: string;
  timestamp: number;
  upvotes: number;
}

export interface TriggerMap {
  [keyword: string]: ResponseCategory;
}
