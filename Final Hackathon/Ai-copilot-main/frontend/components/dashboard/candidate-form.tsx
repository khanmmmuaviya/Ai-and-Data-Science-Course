"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCandidate, listJobs, type CandidateFormValues, type Job } from "@/lib/api";

const initial: CandidateFormValues = {
  job_id: "",
  full_name: "",
  email: "",
  phone: "",
  education_level: "",
  total_experience_years: "0",
  current_job_title: "",
  skills: "",
  expected_salary: "",
  current_location: "",
  consent_given: false,
  resume: null,
  resume_image: null,
};

export function CandidateForm() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState<CandidateFormValues>(initial);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    listJobs({ status: "active", limit: 50 }).then((result) => {
      if (result.ok) {
        setJobs(result.data.items);
        setForm((current) => ({ ...current, job_id: current.job_id || result.data.items[0]?.id || "" }));
      } else {
        setError(result.message);
      }
      setLoadingJobs(false);
    });
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!form.resume) {
      setError("A PDF resume is required.");
      return;
    }
    if (!form.consent_given) {
      setError("Candidate consent is required.");
      return;
    }
    setSubmitting(true);
    const result = await createCandidate(form);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setMessage("Candidate registered successfully.");
    router.push(`/dashboard/candidates/${result.data.id}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-lg border border-line bg-surface p-5" aria-live="polite">
      {error && <p className="rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger">{error}</p>}
      {message && <p className="rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">{message}</p>}
      <label className="grid gap-2 text-sm font-semibold text-primary-strong">
        Applied job
        <select className="rounded-lg border border-line bg-white px-3 py-2 font-normal focus:outline-2" value={form.job_id} onChange={(event) => setForm({ ...form, job_id: event.target.value })} disabled={loadingJobs} required>
          <option value="">{loadingJobs ? "Loading jobs..." : "Select a job"}</option>
          {jobs.map((job) => <option key={job.id} value={job.id}>{job.jobCode} - {job.title}</option>)}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" value={form.full_name} onChange={(value) => setForm({ ...form, full_name: value })} required />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <Field label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
        <Field label="Education level" value={form.education_level} onChange={(value) => setForm({ ...form, education_level: value })} required />
        <Field label="Total experience years" type="number" value={form.total_experience_years} onChange={(value) => setForm({ ...form, total_experience_years: value })} min={0} />
        <Field label="Current job title" value={form.current_job_title} onChange={(value) => setForm({ ...form, current_job_title: value })} />
        <Field label="Expected salary" type="number" value={form.expected_salary} onChange={(value) => setForm({ ...form, expected_salary: value })} min={0} />
        <Field label="Current location" value={form.current_location} onChange={(value) => setForm({ ...form, current_location: value })} />
      </div>
      <Field label="Skills" value={form.skills} onChange={(value) => setForm({ ...form, skills: value })} placeholder="React, Next.js, TypeScript" />
      <div className="grid gap-4 md:grid-cols-2">
        <FileField label="Resume PDF" accept="application/pdf" required file={form.resume} onChange={(file) => setForm({ ...form, resume: file })} help="PDF only, maximum 5 MB and 10 pages." />
        <FileField label="Resume scan or supporting document image" accept="image/png,image/jpeg,image/webp" file={form.resume_image} onChange={(file) => setForm({ ...form, resume_image: file })} help="Optional PNG, JPEG or WEBP, maximum 5 MB." />
      </div>
      <p className="rounded-lg border border-line bg-background p-3 text-sm leading-6 text-muted">
        Images are processed only for document quality and OCR readiness. They are not used to judge appearance or protected characteristics.
      </p>
      <label className="flex gap-3 rounded-lg border border-line p-3 text-sm text-primary-strong">
        <input type="checkbox" checked={form.consent_given} onChange={(event) => setForm({ ...form, consent_given: event.target.checked })} />
        I confirm the candidate has consented to recruitment processing for this job application.
      </label>
      <button disabled={submitting} className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Uploading..." : "Register candidate"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, min }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string; min?: number }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-primary-strong">
      {label}
      <input className="rounded-lg border border-line bg-white px-3 py-2 font-normal focus:outline-2" value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} placeholder={placeholder} min={min} />
    </label>
  );
}

function FileField({ label, accept, file, onChange, help, required }: { label: string; accept: string; file: File | null; onChange: (file: File | null) => void; help: string; required?: boolean }) {
  return (
    <label className="grid min-h-36 cursor-pointer gap-2 rounded-lg border border-dashed border-line bg-background p-4 text-sm font-semibold text-primary-strong focus-within:outline-2">
      {label}
      <input className="sr-only" type="file" accept={accept} required={required} onChange={(event) => onChange(event.target.files?.[0] || null)} />
      <span className="rounded-lg border border-line bg-surface px-3 py-2 text-center text-sm text-primary">Browse file</span>
      <span className="font-normal text-muted">{file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : help}</span>
    </label>
  );
}
