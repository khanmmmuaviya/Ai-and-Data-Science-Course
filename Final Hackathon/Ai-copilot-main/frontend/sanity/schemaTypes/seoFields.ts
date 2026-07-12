import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO Fields",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", type: "string", validation: (Rule) => Rule.max(70) }),
    defineField({ name: "metaDescription", type: "text", rows: 3, validation: (Rule) => Rule.max(160) }),
    defineField({ name: "ogImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
  ],
});
