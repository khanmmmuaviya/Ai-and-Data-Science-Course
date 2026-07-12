"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "@/lib/api";
import type { UiContent } from "@/lib/sanity/types";

const modalityCards = ["PDF", "Text", "Tabular Data", "Image"];

export function HealthPanel({ labels }: { labels: UiContent }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchHealth();
    if (result.ok) {
      setData(result.data);
    } else {
      setData(null);
      setError(result.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(id);
  }, [load]);

  const apiStatus = loading ? "checking" : error ? "unavailable" : "connected";
  const databaseStatus = data?.database || "disconnected";

  return (
    <section aria-live="polite" className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <StatusCard title={labels.apiStatusLabel} status={apiStatus} detail={error || data?.message || "Checking backend API."} />
        <StatusCard
          title={labels.databaseStatusLabel}
          status={databaseStatus}
          detail={databaseStatus === "connected" ? "MongoDB ping succeeded." : "API is running without a MongoDB connection."}
        />
      </div>
      <button onClick={() => void load()} disabled={loading} className="w-fit rounded-lg border border-line px-4 py-2 text-sm font-semibold text-primary hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Checking..." : labels.retryLabel}
      </button>
      <div className="grid gap-4 md:grid-cols-4">
        {modalityCards.map((title) => (
          <article key={title} className="card p-5">
            <h2 className="font-semibold text-primary-strong">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Workflow preview only. Analysis is disabled for Phase 1.</p>
          </article>
        ))}
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-primary-strong">Future analysis workflow</h2>
        <p className="mt-3 text-muted">Upload, parse, predict, explain, review, and export steps are intentionally placeholders.</p>
        <button disabled className="mt-5 rounded-lg bg-primary px-5 py-3 font-semibold text-white opacity-50">
          Start Candidate Analysis
        </button>
      </div>
    </section>
  );
}

function StatusCard({ title, status, detail }: { title: string; status: string; detail: string }) {
  const ok = status === "connected";
  const checking = status === "checking";
  return (
    <article className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-primary-strong">{title}</h2>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${ok ? "bg-success/10 text-success" : checking ? "bg-accent/20 text-primary" : "bg-danger/10 text-danger"}`}>
          <span className={`size-2 rounded-full ${ok ? "bg-success" : checking ? "bg-accent" : "bg-danger"}`} />
          {status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
