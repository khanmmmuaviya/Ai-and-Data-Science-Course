import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fallbackContent } from "@/lib/fallback-content";

export default function ContactPage() {
  return (
    <>
      <Header navigation={fallbackContent.navigation} settings={fallbackContent.siteSettings} />
      <main className="container-page py-16">
        <h1 className="text-4xl font-semibold text-primary-strong">Contact</h1>
        <p className="mt-4 text-muted">Use your CMS contact settings to manage production contact details.</p>
        <div className="mt-6 card max-w-xl p-6">
          <p>Email: {fallbackContent.siteSettings.contactEmail}</p>
          <p className="mt-2">Phone: {fallbackContent.siteSettings.contactPhone}</p>
        </div>
      </main>
      <Footer footer={fallbackContent.footer} settings={fallbackContent.siteSettings} />
    </>
  );
}
