import { fallbackContent } from "@/lib/fallback-content";
import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import type { HomeContent } from "@/lib/sanity/types";

const homeQuery = `{
  "siteSettings": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"][0],
  "hero": *[_type == "homePage"][0]{
    badge,
    heading,
    highlightedText,
    description,
    "primaryCtaLabel": primaryCta.label,
    "primaryCtaUrl": primaryCta.url,
    "secondaryCtaLabel": secondaryCta.label,
    "secondaryCtaUrl": secondaryCta.url
  },
  "stats": *[_type == "homePage"][0].statistics,
  "features": *[_type == "feature" && active == true] | order(displayOrder asc) {
    title,
    "slug": slug.current,
    shortDescription,
    iconName,
    "order": displayOrder,
    active
  },
  "faqs": *[_type == "faq" && active == true] | order(displayOrder asc) {
    question,
    answer,
    category,
    "order": displayOrder,
    active
  },
  "footer": *[_type == "footerSettings"][0],
  "ui": *[_type == "uiContentSettings"][0]
}`;

export async function getHomeContent(): Promise<HomeContent> {
  if (!isSanityConfigured()) {
    console.warn("Sanity is not configured; using local fallback content.");
    return fallbackContent;
  }

  try {
    const data = await sanityClient.fetch<Partial<HomeContent>>(homeQuery, {}, { next: { revalidate: 60 } });
    return {
      ...fallbackContent,
      ...data,
      siteSettings: { ...fallbackContent.siteSettings, ...data.siteSettings },
      navigation: { ...fallbackContent.navigation, ...data.navigation },
      hero: { ...fallbackContent.hero, ...data.hero },
      footer: { ...fallbackContent.footer, ...data.footer },
      ui: { ...fallbackContent.ui, ...data.ui },
      features: data.features?.length ? data.features : fallbackContent.features,
      faqs: data.faqs?.length ? data.faqs : fallbackContent.faqs,
      stats: data.stats?.length ? data.stats : fallbackContent.stats,
    };
  } catch {
    console.warn("Sanity content fetch failed; using local fallback content.");
    return fallbackContent;
  }
}
