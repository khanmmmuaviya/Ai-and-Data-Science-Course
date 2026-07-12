import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().min(3).max(100) }),
    defineField({ name: "slug", type: "slug", options: { source: "title", isUnique: (value, context) => context.defaultIsUnique(value, context) }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (Rule) => Rule.max(220) }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        { name: "heading", type: "string", validation: (Rule) => Rule.max(100) },
        { name: "description", type: "text", validation: (Rule) => Rule.max(220) },
        { name: "image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] },
      ],
    }),
    defineField({ name: "sections", type: "array", of: [{ type: "object", fields: [{ name: "heading", type: "string" }, { name: "body", type: "text" }, { name: "displayOrder", type: "number" }] }] }),
    defineField({ name: "seo", type: "seoFields" }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
