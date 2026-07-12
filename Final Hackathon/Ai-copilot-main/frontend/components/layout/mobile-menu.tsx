"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/lib/sanity/types";

export function MobileMenu({ links, ctaLabel, ctaUrl }: { links: NavLink[]; ctaLabel: string; ctaUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg border border-line px-3 py-2 text-sm font-semibold"
      >
        Menu
      </button>
      {open && (
        <div className="absolute inset-x-4 top-18 rounded-lg border border-line bg-surface p-4 shadow-xl">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.url} href={link.url} onClick={() => setOpen(false)} className="rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-background">
                {link.label}
              </Link>
            ))}
            <Link href={ctaUrl} onClick={() => setOpen(false)} className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-white">
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
