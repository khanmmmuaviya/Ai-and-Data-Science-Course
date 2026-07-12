import Link from "next/link";
import type { HomeContent } from "@/lib/sanity/types";

const modalities = [
  ["PDF", "Resume and credential documents prepared for parsing."],
  ["Text", "Cover letters, summaries, and recruiter notes in future phases."],
  ["Tabular Data", "Structured job criteria, scorecards, and application metadata."],
  ["Image", "Profile or document imagery staged for later CNN experiments."],
];

export function HomePage({ content }: { content: HomeContent }) {
  return (
    <main>
      <section className="overflow-hidden bg-surface">
        <div className="container-page grid min-h-[calc(100vh-64px)] items-center gap-10 py-14 lg:grid-cols-[1fr_0.85fr]">
          <div className="animate-rise">
            <p className="mb-4 inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-semibold text-primary">
              {content.hero.badge}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-primary-strong sm:text-5xl lg:text-6xl">
              {content.hero.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{content.hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary-strong" href={content.hero.primaryCtaUrl}>
                {content.hero.primaryCtaLabel}
              </Link>
              <Link className="rounded-lg border border-line px-5 py-3 text-center font-semibold text-primary hover:bg-background" href={content.hero.secondaryCtaUrl}>
                {content.hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>
          <div className="card p-5">
            <div className="rounded-lg bg-[#0f2636] p-5 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm text-white/70">Candidate signal preview</span>
                <span className="rounded-full bg-success px-2 py-1 text-xs">ready</span>
              </div>
              <div className="mt-5 grid gap-4">
                {["Skills match", "Experience depth", "Risk review", "Human decision"].map((label, index) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{label}</span>
                      <span>{[84, 71, 28, 100][index]}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-secondary" style={{ width: `${[84, 71, 28, 100][index]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {content.stats.map((stat) => (
            <div className="card p-5" key={stat.label}>
              <div className="text-3xl font-semibold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-primary-strong">Built for multimodal recruitment workflows</h2>
          <p className="mt-3 text-muted">Phase 1 establishes the interface and integration points while keeping unfinished AI features clearly marked.</p>
        </div>
        <div className="stagger mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modalities.map(([title, description]) => (
            <article className="card p-5 transition hover:-translate-y-1 hover:shadow-xl" key={title}>
              <h3 className="text-lg font-semibold text-primary-strong">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-surface py-14">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          {["Connect", "Review", "Explain"].map((step, index) => (
            <div key={step}>
              <div className="mb-4 grid size-10 place-items-center rounded-lg bg-accent/20 font-semibold text-primary">{index + 1}</div>
              <h2 className="text-2xl font-semibold text-primary-strong">{step}</h2>
              <p className="mt-3 leading-7 text-muted">
                {index === 0 && "FastAPI and MongoDB provide operational readiness checks for future candidate workflows."}
                {index === 1 && "Recruiters stay in control with future review decisions and audit events stored outside the CMS."}
                {index === 2 && "The UI reserves clear space for transparent model explanations without pretending Phase 2 is complete."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          {content.features.map((feature) => (
            <article className="card p-6" key={feature.title}>
              <h2 className="text-xl font-semibold text-primary-strong">{feature.title}</h2>
              <p className="mt-3 leading-7 text-muted">{feature.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl font-semibold text-primary-strong">Frequently asked questions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {content.faqs.map((faq) => (
            <article className="card p-5" key={faq.question}>
              <h3 className="font-semibold text-primary-strong">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
