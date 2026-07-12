import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (Rule) => Rule.required().min(8).max(140) }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (Rule) => Rule.required().min(10).max(600) }),
    defineField({ name: "category", type: "string", validation: (Rule) => Rule.max(40) }),
    defineField({ name: "displayOrder", type: "number", initialValue: 0, validation: (Rule) => Rule.integer().min(0) }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
