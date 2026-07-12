"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob, updateJob, type EmploymentType, type Job, type JobPayload, type JobStatus } from "@/lib/api";

const employmentTypes: EmploymentType[] = ["full-time", "part-time", "contract", "internship", "temporary"];
const statuses: JobStatus[] = ["active", "inactive", "closed"];

const empty: JobPayload = {
  title: "",
  department: "",
  description: "",
  requiredSkills: [],
  minimumExperienceYears: 0,
  educationRequirement: "",
  employmentType: "full-time",
  location: "",
  vacancies: 1,
  status: "active",
};

export function JobForm({ job }: { job?: Job }) {
  const router = useRouter();
  const [form, setForm] = useState<JobPayload>(job ? toPayload(job) : empty);
  const [skills, setSkills] = useState(job?.requiredSkills.join(", ") || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (form.title.trim().length < 3 || form.description.trim().length < 40) {
      setError("Title and a detailed description are required.");
      return;
    }
    setSubmitting(true);
    const payload = { ...form, requiredSkills: skills.split(",").map((item) => item.trim()).filter(Boolean) };
    const result = job ? await updateJob(job.id, payload) : await createJob(payload);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setMessage(job ? "Job updated successfully." : "Job created successfully.");
    router.push(`/dashboard/jobs/${result.data.id}`);
  }

  return (
    <form onSubmit={onSubmit} onKeyDown={(event) => event.key === "Enter" && (event.target as HTMLElement).tagName !== "TEXTAREA" && event.preventDefault()} className="grid gap-5 rounded-lg border border-line bg-surface p-5" aria-live="polite">
      {error && <p className="rounded-lg bg-danger/10 p-3 text-sm font-semibold text-danger">{error}</p>}
      {message && <p className="rounded-lg bg-success/10 p-3 text-sm font-semibold text-success">{message}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Job title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} required />
        <Field label="Department" value={form.department} onChange={(value) => setForm({ ...form, department: value })} required />
        <Field label="Location" value={form.location} onChange={(value) => setForm({ ...form, location: value })} />
        <Field label="Education requirement" value={form.educationRequirement} onChange={(value) => setForm({ ...form, educationRequirement: value })} />
        <Field label="Minimum experience years" type="number" value={String(form.minimumExperienceYears)} onChange={(value) => setForm({ ...form, minimumExperienceYears: Number(value) })} min={0} />
        <Field label="Vacancies" type="number" value={String(form.vacancies)} onChange={(value) => setForm({ ...form, vacancies: Number(value) })} min={1} />
      </div>
      <label className="grid gap-2 text-sm font-semibold text-primary-strong">
        Detailed job description
        <textarea className="min-h-36 rounded-lg border border-line bg-white px-3 py-2 font-normal text-foreground focus:outline-2" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
        <span className="text-xs font-normal text-muted">Minimum 40 characters.</span>
      </label>
      <Field label="Required skills" value={skills} onChange={setSkills} placeholder="Next.js, TypeScript, MongoDB" />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-primary-strong">
          Employment type
          <select className="rounded-lg border border-line bg-white px-3 py-2 font-normal text-foreground focus:outline-2" value={form.employmentType} onChange={(event) => setForm({ ...form, employmentType: event.target.value as EmploymentType })}>
            {employmentTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-primary-strong">
          Status
          <select className="rounded-lg border border-line bg-white px-3 py-2 font-normal text-foreground focus:outline-2" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as JobStatus })}>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <button disabled={submitting} className="w-fit rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Saving..." : job ? "Update job" : "Create job"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, min }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string; min?: number }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-primary-strong">
      {label}
      <input className="rounded-lg border border-line bg-white px-3 py-2 font-normal text-foreground focus:outline-2" value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} placeholder={placeholder} min={min} />
    </label>
  );
}

function toPayload(job: Job): JobPayload {
  return {
    title: job.title,
    department: job.department,
    description: job.description,
    requiredSkills: job.requiredSkills,
    minimumExperienceYears: job.minimumExperienceYears,
    educationRequirement: job.educationRequirement,
    employmentType: job.employmentType,
    location: job.location,
    vacancies: job.vacancies,
    status: job.status,
  };
}
