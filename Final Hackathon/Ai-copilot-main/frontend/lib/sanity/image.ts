import imageUrlBuilder from "@sanity/image-url";
import { publicEnv } from "@/lib/env";

const builder = imageUrlBuilder({
  projectId: publicEnv.sanityProjectId || "placeholder",
  dataset: publicEnv.sanityDataset,
});

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
