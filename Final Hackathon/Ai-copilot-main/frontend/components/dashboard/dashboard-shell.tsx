"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchHealth, type DatabaseStatus } from "@/lib/api";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/candidates", label: "Candidates" },
  { href: "#", label: "AI Analysis", soon: true },
  { href: "#", label: "Reviews", soon: true },
  { href: "#", label: "Reports", soon: true },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [database, setDatabase] = useState<DatabaseStatus>("disconnected");
  const [api, setApi] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal).then((result) => {
      if (result.ok) {
        setApi("connected");
        setDatabase(result.data.database);
      } else {
        setApi("unavailable");
        setDatabase("disconnected");
      }
    });
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-line bg-surface p-5 transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Link href="/dashboard" className="block text-lg font-semibold text-primary-strong">
          AI Recruitment Co-Pilot
        </Link>
        <p className="mt-1 text-sm text-muted">Human-reviewed HR workflows</p>
        <nav className="mt-8 grid gap-2">
          {nav.map((item) =>
            item.soon ? (
              <span key={item.label} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted">
                {item.label}
                <span className="text-xs">soon</span>
              </span>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold focus:outline-2 ${pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)) ? "bg-primary text-white" : "text-primary hover:bg-background"}`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </aside>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setOpen(false)} />}
      <div className="md:pl-72">
        <header className="sticky top-0 z-20 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <button className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-primary md:hidden" onClick={() => setOpen(true)}>
              Menu
            </button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Dashboard</p>
              <p className="text-sm text-primary-strong">Recruitment operations</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold">
              <StatusPill label="API" value={api} ok={api === "connected"} />
              <StatusPill label="MongoDB" value={database} ok={database === "connected"} />
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}

function StatusPill({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 ${ok ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
      {label}: {value}
    </span>
  );
}

export function PageHeader({ title, eyebrow, action }: { title: string; eyebrow: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold text-secondary">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-semibold text-primary-strong">{title}</h1>
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface p-8 text-center">
      <h2 className="font-semibold text-primary-strong">{title}</h2>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </div>
  );
}

export function SkeletonRows() {
  return (
    <div className="grid gap-3" aria-label="Loading">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-20 animate-pulse rounded-lg border border-line bg-surface" />
      ))}
    </div>
  );
}
