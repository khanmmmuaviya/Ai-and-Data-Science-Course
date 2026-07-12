"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState, PageHeader, SkeletonRows } from "@/components/dashboard/dashboard-shell";
import { listCandidates, listJobs, type Candidate, type Job, type Pagination } from "@/lib/api";

export default function CandidatesPage() {
  const [items, setItems] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ search: "", job_id: "", status: "", processing_status: "", page: 1 });

  useEffect(() => {
    listJobs({ limit: 50 }).then((result) => result.ok && setJobs(result.data.items));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    listCandidates(filters, controller.signal).then((result) => {
      if (result.ok) {
        setItems(result.data.items);
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
      <PageHeader title="Candidates" eyebrow="Dashboard / Candidates" action={<Link className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white" href="/dashboard/candidates/new">Register Candidate</Link>} />
      <div className="mb-5 grid gap-3 rounded-lg border border-line bg-surface p-4 md:grid-cols-5">
        <input aria-label="Search candidates" className="rounded-lg border border-line px-3 py-2" placeholder="Search candidates" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value, page: 1 })} />
        <select aria-label="Job filter" className="rounded-lg border border-line px-3 py-2" value={filters.job_id} onChange={(event) => setFilters({ ...filters, job_id: event.target.value, page: 1 })}>
          <option value="">All jobs</option>{jobs.map((job) => <option key={job.id} value={job.id}>{job.jobCode}</option>)}
        </select>
        <select aria-label="Status filter" className="rounded-lg border border-line px-3 py-2" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value, page: 1 })}>
          <option value="">All statuses</option><option value="submitted">Submitted</option><option value="reviewing">Reviewing</option><option value="shortlisted">Shortlisted</option><option value="rejected">Rejected</option><option value="withdrawn">Withdrawn</option>
        </select>
        <select aria-label="Processing filter" className="rounded-lg border border-line px-3 py-2" value={filters.processing_status} onChange={(event) => setFilters({ ...filters, processing_status: event.target.value, page: 1 })}>
          <option value="">All processing</option><option value="pending">Pending</option><option value="ready">Ready</option><option value="failed">Failed</option>
        </select>
        <button className="rounded-lg border border-line px-3 py-2 font-semibold text-primary" onClick={() => setFilters({ search: "", job_id: "", status: "", processing_status: "", page: 1 })}>Clear</button>
      </div>
      {error && <p className="mb-4 rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger">{error}</p>}
      {loading ? <SkeletonRows /> : items.length === 0 ? <EmptyState title="No candidates found" detail="Register a candidate with a PDF resume to begin the workflow." /> : (
        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="hidden grid-cols-[1.1fr_1.2fr_1.2fr_1.4fr_.8fr_.8fr_.9fr_.7fr] gap-3 border-b border-line px-4 py-3 text-xs font-semibold uppercase text-muted md:grid">
            <span>Code</span><span>Name</span><span>Applied job</span><span>Skills</span><span>Status</span><span>Processing</span><span>Submitted</span><span>Action</span>
          </div>
          {items.map((candidate) => (
            <article key={candidate.id} className="grid gap-3 border-b border-line px-4 py-4 text-sm last:border-b-0 md:grid-cols-[1.1fr_1.2fr_1.2fr_1.4fr_.8fr_.8fr_.9fr_.7fr] md:items-center">
              <span className="font-mono text-primary">{candidate.candidateCode}</span>
              <span className="font-semibold text-primary-strong">{candidate.fullName}</span>
              <span>{candidate.job?.jobCode || candidate.jobId}</span>
              <span className="text-muted">{candidate.skills.slice(0, 3).join(", ") || "Not specified"}</span>
              <span>{candidate.status}</span>
              <span>{candidate.processingStatus}</span>
              <span>{new Date(candidate.createdAt).toLocaleDateString()}</span>
              <Link className="font-semibold text-primary underline-offset-4 hover:underline" href={`/dashboard/candidates/${candidate.id}`}>View</Link>
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
