import { defineField, defineType } from "sanity";

export const uiContentSettings = defineType({
  name: "uiContentSettings",
  title: "UI Content Settings",
  type: "document",
  fields: [
    defineField({ name: "dashboardTitle", type: "string", initialValue: "Recruitment AI Control Center", validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: "apiStatusLabel", type: "string", initialValue: "Backend API", validation: (Rule) => Rule.required().max(40) }),
    defineField({ name: "databaseStatusLabel", type: "string", initialValue: "MongoDB", validation: (Rule) => Rule.required().max(40) }),
    defineField({
      name: "modalityCards",
      type: "array",
      of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "description", type: "text" }] }],
    }),
    defineField({ name: "buttonLabels", type: "array", of: [{ type: "object", fields: [{ name: "key", type: "string" }, { name: "value", type: "string" }] }] }),
    defineField({ name: "emptyStateMessages", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "errorMessages", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "loadingMessages", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "retryLabel", type: "string", initialValue: "Retry health check", validation: (Rule) => Rule.required().max(40) }),
    defineField({ name: "phaseMessage", type: "text", rows: 3, validation: (Rule) => Rule.required().max(260) }),
  ],
});
