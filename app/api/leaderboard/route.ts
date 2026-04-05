import { NextRequest, NextResponse } from "next/server";
import { ulid } from "ulid";
import { getLeaderboardEntries, submitLeaderboardEntry } from "@/lib/kv";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "63", 10), 63);
    const sort = searchParams.get("sort") === "recent" ? "recent" : "upvotes";

    const entries = await getLeaderboardEntries(limit, sort as "upvotes" | "recent");
    return NextResponse.json({ entries }, {
      headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate" },
    });
  } catch {
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, response_snippet, display_name } = body;

    if (!prompt || typeof prompt !== "string" || prompt.length < 1 || prompt.length > 500) {
      return NextResponse.json({ error: "Prompt must be 1-500 characters" }, { status: 400 });
    }

    const sanitize = (s: string) =>
      s.replace(/[<>&"'`]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();

    const entry = {
      id: ulid(),
      prompt: sanitize(prompt.slice(0, 500)),
      response_snippet: sanitize((response_snippet || "").slice(0, 200)),
      display_name: sanitize((display_name || "Anonymous Barista").slice(0, 30)),
      timestamp: Date.now(),
    };

    await submitLeaderboardEntry(entry);
    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
