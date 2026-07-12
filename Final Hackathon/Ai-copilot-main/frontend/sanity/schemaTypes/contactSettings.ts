import { defineField, defineType } from "sanity";

export const contactSettings = defineType({
  name: "contactSettings",
  title: "Contact Settings",
  type: "document",
  fields: [
    defineField({ name: "heading", type: "string", validation: (Rule) => Rule.required().max(100) }),
    defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.max(260) }),
    defineField({
      name: "contactMethods",
      type: "array",
      of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "value", type: "string" }, { name: "url", type: "string", validation: (Rule) => Rule.regex(/^(mailto:|tel:|\/|https?:\/\/)/) }] }],
    }),
    defineField({ name: "officeAddress", type: "text", rows: 3 }),
    defineField({ name: "mapUrl", type: "url" }),
    defineField({ name: "formLabels", type: "object", fields: [{ name: "name", type: "string" }, { name: "email", type: "string" }, { name: "message", type: "string" }, { name: "submit", type: "string" }] }),
    defineField({ name: "successMessage", type: "string", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
  ],
});
