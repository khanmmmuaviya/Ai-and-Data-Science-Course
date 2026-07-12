export type SiteSettings = {
  websiteName: string;
  shortName?: string;
  contactEmail?: string;
  contactPhone?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  maintenanceMode?: boolean;
};

export type NavLink = {
  label: string;
  url: string;
  order?: number;
  active?: boolean;
  openInNewTab?: boolean;
};

export type Navigation = {
  showLogo?: boolean;
  links: NavLink[];
  ctaLabel?: string;
  ctaUrl?: string;
};

export type Feature = {
  title: string;
  slug?: string;
  shortDescription: string;
  iconName?: string;
  order?: number;
  active?: boolean;
};

export type Faq = {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  active?: boolean;
};

export type FooterSettings = {
  description?: string;
  copyrightText?: string;
  poweredByVisible?: boolean;
  linkGroups?: { title: string; links: NavLink[] }[];
};

export type UiContent = {
  dashboardTitle: string;
  apiStatusLabel: string;
  databaseStatusLabel: string;
  retryLabel: string;
  phaseMessage: string;
};

export type HomeContent = {
  siteSettings: SiteSettings;
  navigation: Navigation;
  hero: {
    badge: string;
    heading: string;
    highlightedText?: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
    secondaryCtaLabel: string;
    secondaryCtaUrl: string;
  };
  stats: { label: string; value: string }[];
  features: Feature[];
  faqs: Faq[];
  footer: FooterSettings;
  ui: UiContent;
};
