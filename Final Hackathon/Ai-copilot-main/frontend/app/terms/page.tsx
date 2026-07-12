import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fallbackContent } from "@/lib/fallback-content";

export default function TermsPage() {
  return (
    <>
      <Header navigation={fallbackContent.navigation} settings={fallbackContent.siteSettings} />
      <main className="container-page py-16">
        <h1 className="text-4xl font-semibold text-primary-strong">Terms and Conditions</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">This MVP foundation does not provide automated hiring decisions or production AI analysis.</p>
      </main>
      <Footer footer={fallbackContent.footer} settings={fallbackContent.siteSettings} />
    </>
  );
}
