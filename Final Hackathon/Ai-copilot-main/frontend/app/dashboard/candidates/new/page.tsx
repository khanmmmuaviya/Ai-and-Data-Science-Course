import { CandidateForm } from "@/components/dashboard/candidate-form";
import { PageHeader } from "@/components/dashboard/dashboard-shell";

export default function NewCandidatePage() {
  return (
    <>
      <PageHeader title="Register Candidate" eyebrow="Dashboard / Candidates / New" />
      <CandidateForm />
    </>
  );
}
