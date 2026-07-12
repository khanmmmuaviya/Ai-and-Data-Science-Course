import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HomePage } from "@/components/home/home-page";
import { getHomeContent } from "@/lib/sanity/queries";

export default async function Page() {
  const content = await getHomeContent();

  return (
    <>
      <Header navigation={content.navigation} settings={content.siteSettings} />
      <HomePage content={content} />
      <Footer footer={content.footer} settings={content.siteSettings} />
    </>
  );
}
