import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import type { Navigation, SiteSettings } from "@/lib/sanity/types";

export function Header({ navigation, settings }: { navigation: Navigation; settings: SiteSettings }) {
  const links = navigation.links.filter((link) => link.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold text-primary-strong">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm font-bold text-white">AI</span>
          {navigation.showLogo !== false && <span>{settings.shortName || settings.websiteName}</span>}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.url} href={link.url} className="text-sm font-medium text-muted transition hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Link className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-strong" href={navigation.ctaUrl || "/dashboard"}>
            {navigation.ctaLabel || "Open Dashboard"}
          </Link>
        </nav>
        <MobileMenu links={links} ctaLabel={navigation.ctaLabel || "Open Dashboard"} ctaUrl={navigation.ctaUrl || "/dashboard"} />
      </div>
    </header>
  );
}
