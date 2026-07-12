import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fallbackContent } from "@/lib/fallback-content";

export default function AboutPage() {
  return <SimplePage title="About" text="AI Recruitment Co-Pilot is a hackathon MVP foundation for secure, explainable hiring workflows." />;
}

function SimplePage({ title, text }: { title: string; text: string }) {
  return (
    <>
      <Header navigation={fallbackContent.navigation} settings={fallbackContent.siteSettings} />
      <main className="container-page py-16">
        <h1 className="text-4xl font-semibold text-primary-strong">{title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-muted">{text}</p>
      </main>
      <Footer footer={fallbackContent.footer} settings={fallbackContent.siteSettings} />
    </>
  );
}
