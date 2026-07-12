import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "showLogo", type: "boolean", initialValue: true }),
    defineField({
      name: "links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", validation: (Rule) => Rule.required().max(40) },
            { name: "url", type: "string", validation: (Rule) => Rule.required().regex(/^(\/|https?:\/\/)/) },
            { name: "openInNewTab", type: "boolean", initialValue: false },
            { name: "displayOrder", type: "number", validation: (Rule) => Rule.integer().min(0) },
            { name: "active", type: "boolean", initialValue: true },
          ],
        },
      ],
    }),
    defineField({ name: "ctaLabel", type: "string", validation: (Rule) => Rule.max(32) }),
    defineField({ name: "ctaUrl", type: "string", validation: (Rule) => Rule.regex(/^(\/|https?:\/\/)/) }),
  ],
});
