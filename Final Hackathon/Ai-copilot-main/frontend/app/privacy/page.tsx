import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fallbackContent } from "@/lib/fallback-content";

export default function PrivacyPage() {
  return (
    <>
      <Header navigation={fallbackContent.navigation} settings={fallbackContent.siteSettings} />
      <main className="container-page py-16">
        <h1 className="text-4xl font-semibold text-primary-strong">Privacy Policy</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">Sensitive recruitment data must remain in MongoDB and operational systems, not public Sanity datasets.</p>
      </main>
      <Footer footer={fallbackContent.footer} settings={fallbackContent.siteSettings} />
    </>
  );
}
