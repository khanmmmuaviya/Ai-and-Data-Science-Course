import "server-only";
import { createClient } from "next-sanity";
import { isSanityConfigured, publicEnv, serverEnv } from "@/lib/env";

export const sanityClient = createClient({
  projectId: publicEnv.sanityProjectId || "placeholder",
  dataset: publicEnv.sanityDataset,
  apiVersion: publicEnv.sanityApiVersion,
  useCdn: !serverEnv.SANITY_API_READ_TOKEN,
  token: serverEnv.SANITY_API_READ_TOKEN,
  stega: false,
});

export { isSanityConfigured };
