"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState, PageHeader, SkeletonRows } from "@/components/dashboard/dashboard-shell";
import { listJobs, type Job, type Pagination } from "@/lib/api";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", status: "", department: "", page: 1 });

  useEffect(() => {
    const controller = new AbortController();
    listJobs(filters, controller.signal).then((result) => {
      if (result.ok) {
        setJobs(result.data.items);
        setPagination(result.data.pagination);
        setError("");
      } else {
        setError(result.message);
      }
      setLoading(false);
    });
    return () => controller.abort();
  }, [filters]);

  return (
    <>
      <PageHeader title="Jobs" eyebrow="Dashboard / Jobs" action={<Link className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white" href="/dashboard/jobs/new">Create Job</Link>} />
      <div className="mb-5 grid gap-3 rounded-lg border border-line bg-surface p-4 md:grid-cols-4">
        <input aria-label="Search jobs" className="rounded-lg border border-line px-3 py-2" placeholder="Search jobs" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value, page: 1 })} />
        <select aria-label="Status filter" className="rounded-lg border border-line px-3 py-2" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value, page: 1 })}>
          <option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="closed">Closed</option>
        </select>
        <input aria-label="Department filter" className="rounded-lg border border-line px-3 py-2" placeholder="Department" value={filters.department} onChange={(event) => setFilters({ ...filters, department: event.target.value, page: 1 })} />
        <button className="rounded-lg border border-line px-3 py-2 font-semibold text-primary" onClick={() => setFilters({ search: "", status: "", department: "", page: 1 })}>Clear</button>
      </div>
      {error && <p className="mb-4 rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger" aria-live="polite">{error}</p>}
      {loading ? <SkeletonRows /> : jobs.length === 0 ? <EmptyState title="No jobs found" detail="Create a job to begin registering candidates." /> : (
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="hidden grid-cols-[1.1fr_1.5fr_1fr_1.3fr_.7fr_.8fr_.8fr] gap-3 border-b border-line px-4 py-3 text-xs font-semibold uppercase text-muted md:grid">
            <span>Code</span><span>Title</span><span>Department</span><span>Skills</span><span>Vacancies</span><span>Status</span><span>Action</span>
          </div>
          {jobs.map((job) => (
            <article key={job.id} className="grid gap-3 border-b border-line px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1.1fr_1.5fr_1fr_1.3fr_.7fr_.8fr_.8fr] md:items-center">
              <span className="font-mono text-primary">{job.jobCode}</span>
              <span className="font-semibold text-primary-strong">{job.title}</span>
              <span>{job.department}</span>
              <span className="text-muted">{job.requiredSkills.slice(0, 3).join(", ") || "Not specified"}</span>
              <span>{job.vacancies}</span>
              <span className="w-fit rounded-full bg-secondary/10 px-2 py-1 text-xs font-semibold text-primary">{job.status}</span>
              <Link className="font-semibold text-primary underline-offset-4 hover:underline" href={`/dashboard/jobs/${job.id}`}>View/edit</Link>
            </article>
          ))}
        </div>
      )}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-end gap-3">
          <button className="rounded-lg border border-line px-3 py-2 disabled:opacity-50" disabled={filters.page <= 1} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>Previous</button>
          <span className="text-sm text-muted">Page {pagination.page} of {pagination.totalPages}</span>
          <button className="rounded-lg border border-line px-3 py-2 disabled:opacity-50" disabled={filters.page >= pagination.totalPages} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next</button>
        </div>
      )}
    </>
  );
}
