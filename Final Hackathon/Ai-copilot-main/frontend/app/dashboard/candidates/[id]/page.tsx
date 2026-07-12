"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageHeader, SkeletonRows } from "@/components/dashboard/dashboard-shell";
import { candidateResumeUrl, getCandidate, updateCandidateStatus, type Candidate, type CandidateStatus } from "@/lib/api";

const statuses: CandidateStatus[] = ["submitted", "reviewing", "shortlisted", "rejected", "withdrawn"];

export default function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    getCandidate(id, controller.signal).then((result) => {
      if (result.ok) setCandidate(result.data);
      else setError(result.message);
      setLoading(false);
    });
    return () => controller.abort();
  }, [id]);

  async function changeStatus(status: CandidateStatus) {
    const result = await updateCandidateStatus(id, status);
    if (result.ok) {
      setCandidate({ ...result.data, job: candidate?.job });
      setMessage("Candidate status updated.");
    } else {
      setError(result.message);
    }
  }

  return (
    <>
      <PageHeader title={candidate?.candidateCode || "Candidate Detail"} eyebrow="Dashboard / Candidates / Detail" />
      {loading ? <SkeletonRows /> : error ? <p className="rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger">{error}</p> : candidate && (
        <div className="grid gap-5">
          {message && <p className="rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">{message}</p>}
          <section className="grid gap-4 rounded-lg border border-line bg-surface p-5 md:grid-cols-3">
            <Info label="Name" value={candidate.fullName} /><Info label="Email" value={candidate.email} /><Info label="Phone" value={candidate.phone} />
            <Info label="Applied job" value={candidate.job ? `${candidate.job.jobCode} - ${candidate.job.title}` : candidate.jobId} />
            <Info label="Education" value={candidate.educationLevel} /><Info label="Experience" value={`${candidate.totalExperienceYears} years`} />
            <Info label="Current title" value={candidate.currentJobTitle || "Not provided"} /><Info label="Location" value={candidate.currentLocation || "Not provided"} /><Info label="Expected salary" value={candidate.expectedSalary ? String(candidate.expectedSalary) : "Not provided"} />
          </section>
          <section className="rounded-lg border border-line bg-surface p-5">
            <h2 className="font-semibold text-primary-strong">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">{candidate.skills.map((skill) => <span key={skill} className="rounded-full bg-secondary/10 px-3 py-1 text-sm text-primary">{skill}</span>)}</div>
          </section>
          <section className="grid gap-4 md:grid-cols-2">
            <DocumentCard title="Resume metadata" meta={candidate.resume} action={<a className="mt-3 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white" href={candidateResumeUrl(candidate.id)}>Download resume</a>} />
            <DocumentCard title="Supporting document metadata" meta={candidate.resumeImage || undefined} />
          </section>
          <section className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 rounded-lg border border-line bg-surface p-5 text-sm font-semibold text-primary-strong">
              Status
              <select className="rounded-lg border border-line px-3 py-2 font-normal" value={candidate.status} onChange={(event) => changeStatus(event.target.value as CandidateStatus)}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <Placeholder title="AI analysis" text="Coming in Phase 3. No automated suitability decision is made here." />
            <Placeholder title="Human review" text="Recruiter review notes and final decisions remain human-owned." />
          </section>
        </div>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs font-semibold uppercase text-muted">{label}</p><p className="mt-1 font-semibold text-primary-strong">{value}</p></div>;
}

function DocumentCard({ title, meta, action }: { title: string; meta?: Candidate["resumeImage"] | Candidate["resume"]; action?: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-line bg-surface p-5">
      <h2 className="font-semibold text-primary-strong">{title}</h2>
      {meta ? (
        <div className="mt-3 grid gap-2 text-sm text-muted">
          <span>Original: {meta.originalName}</span>
          <span>Stored: {meta.storedName}</span>
          <span>Type: {meta.mimeType}</span>
          <span>Size: {Math.round(meta.sizeBytes / 1024)} KB</span>
          {meta.pageCount && <span>Pages: {meta.pageCount}</span>}
          {meta.width && meta.height && <span>Dimensions: {meta.width} x {meta.height}</span>}
        </div>
      ) : <p className="mt-3 text-sm text-muted">No supporting document image uploaded.</p>}
      {action}
    </article>
  );
}

function Placeholder({ title, text }: { title: string; text: string }) {
  return <article className="rounded-lg border border-line bg-surface p-5"><h2 className="font-semibold text-primary-strong">{title}</h2><p className="mt-2 text-sm leading-6 text-muted">{text}</p></article>;
}
