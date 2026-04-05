import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./kv";
import { hashIP } from "./kv";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

const limiters = {
  attempts: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 h"),
    prefix: "ratelimit:attempts",
  }),
  submissions: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 d"),
    prefix: "ratelimit:submissions",
  }),
  upvotes: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "ratelimit:upvotes",
  }),
};

export async function checkRateLimit(
  ip: string,
  action: keyof typeof limiters,
): Promise<RateLimitResult> {
  const ipHash = hashIP(ip);
  try {
    const { success, remaining } = await limiters[action].limit(ipHash);
    return { allowed: success, remaining };
  } catch {
    return { allowed: true, remaining: 0 };
  }
}

export const RATE_LIMITS = {
  attempts: { action: "attempts", maxRequests: 30, windowSeconds: 3600 },
  submissions: { action: "submissions", maxRequests: 3, windowSeconds: 86400 },
  upvotes: { action: "upvotes", maxRequests: 10, windowSeconds: 3600 },
} as const;
