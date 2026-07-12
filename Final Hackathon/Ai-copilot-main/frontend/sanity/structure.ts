import type { StructureResolver } from "sanity/structure";

const singletonTypes = [
  ["siteSettings", "Site Settings"],
  ["navigation", "Navigation"],
  ["homePage", "Home Page"],
  ["contactSettings", "Contact Settings"],
  ["footerSettings", "Footer"],
  ["uiContentSettings", "UI Content"],
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items(
              singletonTypes.map(([type, title]) =>
                S.listItem()
                  .title(title)
                  .id(type)
                  .child(S.document().schemaType(type).documentId(type).title(title)),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem("feature").title("Features"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("teamMember").title("Team Members"),
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("legalPage").title("Legal Pages"),
    ]);
