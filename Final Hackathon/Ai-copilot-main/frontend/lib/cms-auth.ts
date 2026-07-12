import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { serverEnv } from "@/lib/env";

const cookieName = "cms_session";
const attempts = new Map<string, { count: number; resetAt: number }>();

function secretKey() {
  return new TextEncoder().encode(serverEnv.CMS_SESSION_SECRET || "dev-only-placeholder-secret-change-before-use");
}

export function getCmsRoutePath() {
  return serverEnv.CMS_ROUTE_PATH || "/control-room-7f3a";
}

export function checkRateLimit(key: string) {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  record.count += 1;
  return record.count <= 5;
}

export async function validateCmsCredentials(email: string, password: string) {
  if (!serverEnv.CMS_ADMIN_EMAIL || !serverEnv.CMS_PASSWORD || !serverEnv.CMS_SESSION_SECRET) {
    return false;
  }

  const emailMatches = email.trim().toLowerCase() === serverEnv.CMS_ADMIN_EMAIL.toLowerCase();
  const passwordMatches = password === serverEnv.CMS_PASSWORD;
  return emailMatches && passwordMatches;
}

export async function createCmsSession(email: string) {
  return new SignJWT({ email, scope: "cms" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey());
}

export async function setCmsCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: getCmsRoutePath(),
    maxAge: 60 * 60 * 2,
  });
}

export async function clearCmsCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isCmsAuthorized() {
  if (!serverEnv.CMS_SESSION_SECRET) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.scope === "cms";
  } catch {
    return false;
  }
}
