import { NextRequest, NextResponse } from "next/server";
import { upvoteEntry, hashIP } from "@/lib/kv";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entry_id } = body;

    if (!entry_id || typeof entry_id !== "string") {
      return NextResponse.json({ error: "entry_id required" }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = hashIP(ip);

    const newScore = await upvoteEntry(entry_id, ipHash);
    if (newScore === null) {
      return NextResponse.json({ error: "Already upvoted" }, { status: 409 });
    }

    return NextResponse.json({ upvotes: newScore });
  } catch {
    return NextResponse.json({ error: "Failed to upvote" }, { status: 500 });
  }
}
