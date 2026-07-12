import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fallbackContent } from "@/lib/fallback-content";

export default function FeaturesPage() {
  return (
    <>
      <Header navigation={fallbackContent.navigation} settings={fallbackContent.siteSettings} />
      <main className="container-page py-16">
        <h1 className="text-4xl font-semibold text-primary-strong">Features</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {fallbackContent.features.map((feature) => (
            <article className="card p-6" key={feature.title}>
              <h2 className="text-xl font-semibold text-primary-strong">{feature.title}</h2>
              <p className="mt-3 text-muted">{feature.shortDescription}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer footer={fallbackContent.footer} settings={fallbackContent.siteSettings} />
    </>
  );
}
