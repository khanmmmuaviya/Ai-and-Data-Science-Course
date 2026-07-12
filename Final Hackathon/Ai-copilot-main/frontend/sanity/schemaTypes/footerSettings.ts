import { defineField, defineType } from "sanity";
import type { StringRule } from "sanity";

const link = {
  type: "object",
  fields: [
    { name: "label", type: "string", validation: (Rule: StringRule) => Rule.required().max(40) },
    { name: "url", type: "string", validation: (Rule: StringRule) => Rule.required().regex(/^(\/|https?:\/\/)/) },
  ],
};

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", type: "image", fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.max(260) }),
    defineField({ name: "linkGroups", type: "array", of: [{ type: "object", fields: [{ name: "title", type: "string", validation: (Rule) => Rule.required().max(50) }, { name: "links", type: "array", of: [link] }] }] }),
    defineField({ name: "socialLinks", type: "array", of: [link] }),
    defineField({ name: "newsletterVisible", type: "boolean", initialValue: false }),
    defineField({ name: "copyrightText", type: "string", validation: (Rule) => Rule.max(120) }),
    defineField({ name: "legalLinks", type: "array", of: [link] }),
    defineField({ name: "poweredByVisible", type: "boolean", initialValue: false }),
  ],
});
