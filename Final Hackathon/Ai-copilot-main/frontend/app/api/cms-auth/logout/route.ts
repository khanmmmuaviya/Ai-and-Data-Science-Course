import { NextRequest, NextResponse } from "next/server";
import { clearCmsCookie } from "@/lib/cms-auth";

export async function POST(request: NextRequest) {
  await clearCmsCookie();
  return NextResponse.redirect(new URL("/cms-access", request.url), { status: 303 });
}
