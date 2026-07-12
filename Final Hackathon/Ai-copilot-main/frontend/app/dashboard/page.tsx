import Link from "next/link";
import { PageHeader } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Overview" eyebrow="Recruitment workspace" />
      <section className="grid gap-4 lg:grid-cols-3">
        <Link href="/dashboard/jobs/new" className="card p-5 hover:border-secondary">
          <h2 className="font-semibold text-primary-strong">Create a job</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Open a role with validated requirements, skills, vacancies and status.</p>
        </Link>
        <Link href="/dashboard/candidates/new" className="card p-5 hover:border-secondary">
          <h2 className="font-semibold text-primary-strong">Register candidate</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Attach a PDF resume and optional resume scan or document image.</p>
        </Link>
        <article className="card p-5">
          <h2 className="font-semibold text-primary-strong">Phase 3 readiness</h2>
          <p className="mt-2 text-sm leading-6 text-muted">AI analysis, explainability and reports remain disabled until multimodal processing is added.</p>
        </article>
      </section>
      <section className="mt-6 rounded-lg border border-line bg-surface p-5">
        <h2 className="font-semibold text-primary-strong">Ethics boundary</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          The system supports human recruiters and does not make final hiring decisions. Images are processed only for document quality and OCR readiness. They are not used to judge candidate appearance or protected characteristics.
        </p>
      </section>
    </>
  );
}
