import Link from "next/link";
import type { FooterSettings, SiteSettings } from "@/lib/sanity/types";

export function Footer({ footer, settings }: { footer: FooterSettings; settings: SiteSettings }) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.3fr_2fr]">
        <div>
          <div className="text-lg font-semibold text-primary-strong">{settings.websiteName}</div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">{footer.description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {footer.linkGroups?.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
              <div className="mt-3 grid gap-2">
                {group.links.map((link) => (
                  <Link key={link.url} href={link.url} className="text-sm text-muted hover:text-primary">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-page border-t border-line py-5 text-sm text-muted">{footer.copyrightText}</div>
    </footer>
  );
}
