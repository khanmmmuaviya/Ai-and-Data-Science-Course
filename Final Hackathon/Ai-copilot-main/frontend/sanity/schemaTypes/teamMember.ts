import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "biography", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "socialLinks", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }] }),
    defineField({ name: "displayOrder", type: "number", validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
