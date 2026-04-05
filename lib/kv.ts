import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { LeaderboardEntry } from "./types";

export const redis = Redis.fromEnv();

export async function getGlobalAttemptCount(): Promise<number> {
  const count = await redis.get<number>("total_attempts");
  return count ?? 4182;
}

export async function incrementGlobalAttempts(): Promise<number> {
  return redis.incr("total_attempts");
}

async function fetchEntries(ids: string[]): Promise<LeaderboardEntry[]> {
  const entries = await Promise.all(
    ids.map((id) => redis.hgetall(`entry:${id}`)),
  );
  return entries.filter(Boolean) as unknown as LeaderboardEntry[];
}

export async function getLeaderboardEntries(
  limit: number = 63,
  sort: "upvotes" | "recent" = "upvotes",
): Promise<LeaderboardEntry[]> {
  if (sort === "upvotes") {
    const ids = await redis.zrange<string[]>("leaderboard:entries", 0, limit - 1, { rev: true });
    if (!ids || ids.length === 0) return [];
    return fetchEntries(ids);
  }

  const ids = await redis.zrange<string[]>("leaderboard:entries", 0, -1, { rev: true });
  if (!ids || ids.length === 0) return [];
  const entries = await fetchEntries(ids);
  return entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

export async function submitLeaderboardEntry(
  entry: Omit<LeaderboardEntry, "upvotes">,
): Promise<void> {
  await redis.hset(`entry:${entry.id}`, { ...entry, upvotes: 0 });
  await redis.zadd("leaderboard:entries", { score: 0, member: entry.id });
}

export async function upvoteEntry(entryId: string, ipHash: string): Promise<number | null> {
  const upvoteKey = `upvote:${ipHash}:${entryId}`;
  const alreadyVoted = await redis.exists(upvoteKey);
  if (alreadyVoted) return null;

  await redis.set(upvoteKey, "1");
  const newScore = await redis.zincrby("leaderboard:entries", 1, entryId);
  await redis.hincrby(`entry:${entryId}`, "upvotes", 1);
  return newScore;
}

export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
