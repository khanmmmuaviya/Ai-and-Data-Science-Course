import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ enabled: false, message: "Preview mode is reserved for a later phase." });
}
