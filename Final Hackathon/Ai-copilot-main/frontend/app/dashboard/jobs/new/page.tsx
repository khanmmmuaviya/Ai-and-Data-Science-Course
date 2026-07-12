import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { JobForm } from "@/components/dashboard/job-form";

export default function NewJobPage() {
  return (
    <>
      <PageHeader title="Create Job" eyebrow="Dashboard / Jobs / New" />
      <JobForm />
    </>
  );
}
