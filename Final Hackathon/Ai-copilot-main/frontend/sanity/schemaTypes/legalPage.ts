import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", options: { list: ["Privacy Policy", "Terms and Conditions", "Disclaimer"] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", isUnique: (value, context) => context.defaultIsUnique(value, context) }, validation: (Rule) => Rule.required() }),
    defineField({ name: "lastUpdated", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "seo", type: "seoFields" }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
