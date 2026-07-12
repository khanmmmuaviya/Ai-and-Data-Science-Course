import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SanityStudio } from "@/components/cms/sanity-studio";
import { isCmsAuthorized } from "@/lib/cms-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Workspace",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  if (!(await isCmsAuthorized())) {
    redirect("/cms-access");
  }

  return <SanityStudio />;
}
