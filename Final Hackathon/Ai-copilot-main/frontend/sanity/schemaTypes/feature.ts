import { defineField, defineType } from "sanity";

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().min(3).max(80) }),
    defineField({ name: "slug", type: "slug", options: { source: "title", isUnique: (value, context) => context.defaultIsUnique(value, context) }, validation: (Rule) => Rule.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (Rule) => Rule.required().max(220) }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "iconName", type: "string", validation: (Rule) => Rule.max(40) }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "displayOrder", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
