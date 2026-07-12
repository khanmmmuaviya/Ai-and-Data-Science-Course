import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "websiteName", type: "string", initialValue: "AI Recruitment Co-Pilot", validation: (Rule) => Rule.required().min(3).max(80) }),
    defineField({ name: "shortName", type: "string", validation: (Rule) => Rule.max(32) }),
    defineField({ name: "logo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "darkLogo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
    defineField({ name: "favicon", type: "image" }),
    defineField({ name: "primaryColor", type: "string", initialValue: "#22577a" }),
    defineField({ name: "secondaryColor", type: "string", initialValue: "#38a3a5" }),
    defineField({ name: "accentColor", type: "string", initialValue: "#f4b942" }),
    defineField({ name: "defaultTheme", type: "string", options: { list: ["light", "dark", "system"] }, initialValue: "light" }),
    defineField({ name: "contactEmail", type: "email", validation: (Rule) => Rule.required() }),
    defineField({ name: "contactPhone", type: "string", validation: (Rule) => Rule.max(32) }),
    defineField({ name: "socialLinks", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }] }),
    defineField({ name: "maintenanceMode", type: "boolean", initialValue: false }),
    defineField({ name: "defaultSeo", type: "seoFields" }),
    defineField({ name: "openGraphImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(120) }] }),
  ],
});
