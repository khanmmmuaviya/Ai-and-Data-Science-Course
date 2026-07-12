import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "ai-recruitment-copilot",
  title: "AI Recruitment Co-Pilot",
  projectId,
  dataset,
  basePath: "/control-room-7f3a",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
