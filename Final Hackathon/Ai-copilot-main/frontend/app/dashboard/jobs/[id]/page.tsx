"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader, SkeletonRows } from "@/components/dashboard/dashboard-shell";
import { JobForm } from "@/components/dashboard/job-form";
import { deleteJob, getJob, type Job } from "@/lib/api";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    getJob(id, controller.signal).then((result) => {
      if (result.ok) setJob(result.data);
      else setError(result.message);
      setLoading(false);
    });
    return () => controller.abort();
  }, [id]);

  async function onDelete() {
    setError("");
    const result = await deleteJob(id);
    if (result.ok) {
      setJob(result.data);
      setMessage(result.message || "Job updated.");
    } else {
      setError(result.message);
    }
  }

  return (
    <>
      <PageHeader title={job?.jobCode || "Job Detail"} eyebrow="Dashboard / Jobs / Detail" action={<Link className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-primary" href="/dashboard/candidates/new">Register Candidate</Link>} />
      {loading ? <SkeletonRows /> : error ? <p className="rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger">{error}</p> : job && (
        <div className="grid gap-5">
          {message && <p className="rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">{message}</p>}
          <section className="grid gap-3 rounded-lg border border-line bg-surface p-5 md:grid-cols-4">
            <Info label="Title" value={job.title} /><Info label="Department" value={job.department} /><Info label="Status" value={job.status} /><Info label="Vacancies" value={String(job.vacancies)} />
          </section>
          <JobForm job={job} />
          <button onClick={onDelete} className="w-fit rounded-lg border border-danger px-4 py-2 text-sm font-semibold text-danger">Delete or close job</button>
        </div>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs font-semibold uppercase text-muted">{label}</p><p className="mt-1 font-semibold text-primary-strong">{value}</p></div>;
}
