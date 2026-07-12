import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.max(80) }),
    defineField({ name: "company", type: "string", validation: (Rule) => Rule.max(80) }),
    defineField({ name: "quote", type: "text", rows: 4, validation: (Rule) => Rule.required().max(500) }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "rating", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
