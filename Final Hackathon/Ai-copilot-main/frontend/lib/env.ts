import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  CMS_ADMIN_EMAIL: z.email().optional(),
  CMS_PASSWORD: z.string().min(1).optional(),
  CMS_SESSION_SECRET: z.string().min(32).optional(),
  CMS_ROUTE_PATH: z.string().default("/control-room-7f3a"),
  SANITY_API_READ_TOKEN: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse({
  CMS_ADMIN_EMAIL: process.env.CMS_ADMIN_EMAIL,
  CMS_PASSWORD: process.env.CMS_PASSWORD,
  CMS_SESSION_SECRET: process.env.CMS_SESSION_SECRET,
  CMS_ROUTE_PATH: process.env.CMS_ROUTE_PATH,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
});

export const publicEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01",
};

export function isSanityConfigured() {
  return Boolean(
    publicEnv.sanityProjectId &&
      publicEnv.sanityProjectId !== "your-project-id" &&
      publicEnv.sanityDataset,
  );
}
