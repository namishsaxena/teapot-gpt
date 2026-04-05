import { NextResponse } from "next/server";
import { getGlobalAttemptCount, incrementGlobalAttempts } from "@/lib/kv";

export async function GET() {
  try {
    const count = await getGlobalAttemptCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 4182 });
  }
}

export async function POST() {
  try {
    const count = await incrementGlobalAttempts();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 4182 });
  }
}
