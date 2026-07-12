import { defineField, defineType } from "sanity";
import type { StringRule } from "sanity";

const cta = {
  type: "object",
  fields: [
    { name: "label", type: "string" },
    { name: "url", type: "string", validation: (Rule: StringRule) => Rule.regex(/^(\/|https?:\/\/)/) },
  ],
};
const section = { type: "object", fields: [{ name: "title", type: "string" }, { name: "description", type: "text" }, { name: "visible", type: "boolean", initialValue: true }, { name: "displayOrder", type: "number" }] };

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "badge", type: "string", validation: (Rule) => Rule.required().max(60) }),
    defineField({ name: "heading", type: "string", validation: (Rule) => Rule.required().min(10).max(120) }),
    defineField({ name: "highlightedText", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.required().max(260) }),
    defineField({ name: "primaryCta", ...cta }),
    defineField({ name: "secondaryCta", ...cta }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "trustIndicators", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "statistics", type: "array", of: [{ type: "object", fields: [{ name: "value", type: "string" }, { name: "label", type: "string" }] }] }),
    defineField({ name: "sectionVisibility", type: "array", of: [section] }),
    defineField({ name: "featuresSection", ...section }),
    defineField({ name: "howItWorksSection", type: "array", of: [section] }),
    defineField({ name: "modalitiesSection", type: "array", of: [section] }),
    defineField({ name: "humanInTheLoopSection", ...section }),
    defineField({ name: "explainableAiSection", ...section }),
    defineField({ name: "testimonialsSection", ...section }),
    defineField({ name: "faqSection", ...section }),
    defineField({ name: "finalCta", ...cta }),
    defineField({ name: "seo", type: "seoFields" }),
  ],
});
