import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

type RateLimitAction = "attempts" | "submissions" | "upvotes";

function getAction(pathname: string, method: string): RateLimitAction | null {
  if (pathname === "/api/attempt" && method === "POST") return "attempts";
  if (pathname === "/api/leaderboard" && method === "POST") return "submissions";
  if (pathname === "/api/upvote" && method === "POST") return "upvotes";
  return null;
}

export async function proxy(request: NextRequest) {
  const action = getAction(request.nextUrl.pathname, request.method);
  if (!action) return NextResponse.next();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, remaining } = await checkRateLimit(ip, action);

  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limited. The teapot needs a break too." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } },
    );
  }

  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Remaining", remaining.toString());
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
