import type { HomeContent } from "@/lib/sanity/types";

export const fallbackContent: HomeContent = {
  siteSettings: {
    websiteName: "AI Recruitment Co-Pilot",
    shortName: "RecruitAI",
    contactEmail: "hello@example.com",
    contactPhone: "+1 555 0100",
    primaryColor: "#22577a",
    secondaryColor: "#38a3a5",
    accentColor: "#f4b942",
    maintenanceMode: false,
  },
  navigation: {
    showLogo: true,
    links: [
      { label: "Home", url: "/", order: 1, active: true },
      { label: "Features", url: "/features", order: 2, active: true },
      { label: "How It Works", url: "/#how-it-works", order: 3, active: true },
      { label: "About", url: "/about", order: 4, active: true },
      { label: "Contact", url: "/contact", order: 5, active: true },
    ],
    ctaLabel: "Open Dashboard",
    ctaUrl: "/dashboard",
  },
  hero: {
    badge: "Hackathon MVP foundation",
    heading: "Screen candidates with transparent AI signals.",
    highlightedText: "transparent AI",
    description:
      "A professional starting point for multimodal recruitment analysis, human review, and explainable decision support.",
    primaryCtaLabel: "Open Dashboard",
    primaryCtaUrl: "/dashboard",
    secondaryCtaLabel: "Explore Features",
    secondaryCtaUrl: "/features",
  },
  stats: [
    { label: "Modalities planned", value: "4" },
    { label: "Human checkpoints", value: "100%" },
    { label: "Phase", value: "1" },
  ],
  features: [
    {
      title: "Multimodal intake",
      shortDescription:
        "Prepare the workflow for PDFs, text, tabular records, and candidate images without storing sensitive data in the CMS.",
      iconName: "layers",
      order: 1,
      active: true,
    },
    {
      title: "Explainable scoring",
      shortDescription:
        "Reserve space for SHAP-style explanations and recruiter-friendly confidence signals in Phase 2.",
      iconName: "spark",
      order: 2,
      active: true,
    },
    {
      title: "Human-in-the-loop review",
      shortDescription:
        "Keep review ownership with hiring teams through clear states, warnings, and future audit trails.",
      iconName: "review",
      order: 3,
      active: true,
    },
  ],
  faqs: [
    {
      question: "Is candidate data stored in Sanity?",
      answer:
        "No. Sanity is only for public website content. Candidate records, resumes, AI results, and private review notes belong in MongoDB.",
      category: "Security",
      order: 1,
      active: true,
    },
    {
      question: "Does Phase 1 run AI analysis?",
      answer:
        "No. This phase establishes the frontend, CMS, FastAPI backend, MongoDB health checks, and protected Studio foundation.",
      category: "Product",
      order: 2,
      active: true,
    },
  ],
  footer: {
    description:
      "A secure foundation for AI-assisted recruitment workflows, built for fast hackathon iteration.",
    copyrightText: "© 2026 AI Recruitment Co-Pilot. All rights reserved.",
    linkGroups: [
      {
        title: "Product",
        links: [
          { label: "Features", url: "/features" },
          { label: "Dashboard", url: "/dashboard" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
        ],
      },
    ],
  },
  ui: {
    dashboardTitle: "Recruitment AI Control Center",
    apiStatusLabel: "Backend API",
    databaseStatusLabel: "MongoDB",
    retryLabel: "Retry health check",
    phaseMessage:
      "Phase 1 is connected. Candidate uploads, ANN/CNN training, LLM calls, SHAP, and reports are intentionally reserved for Phase 2.",
  },
};
