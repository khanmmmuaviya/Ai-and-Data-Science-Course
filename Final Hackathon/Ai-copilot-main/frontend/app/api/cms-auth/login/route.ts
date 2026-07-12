import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, createCmsSession, getCmsRoutePath, setCmsCookie, validateCmsCredentials } from "@/lib/cms-auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const clientKey = request.headers.get("x-forwarded-for") || "local";

  if (!checkRateLimit(clientKey)) {
    return NextResponse.redirect(new URL("/cms-access?error=rate", request.url), { status: 303 });
  }

  const valid = await validateCmsCredentials(email, password);
  if (!valid) {
    return NextResponse.redirect(new URL("/cms-access?error=invalid", request.url), { status: 303 });
  }

  const token = await createCmsSession(email);
  await setCmsCookie(token);
  return NextResponse.redirect(new URL(getCmsRoutePath(), request.url), { status: 303 });
}
