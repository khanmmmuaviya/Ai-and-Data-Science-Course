export type DatabaseStatus = "connected" | "disconnected";

export type HealthResponse = {
  success: boolean;
  message: string;
  database: DatabaseStatus;
  version: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, unknown>;
};

export type ApiResult<T> =
  | { ok: true; data: T; message?: string }
  | { ok: false; message: string; status?: number; errors?: Record<string, unknown> };

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type JobStatus = "active" | "inactive" | "closed";
export type EmploymentType = "full-time" | "part-time" | "contract" | "internship" | "temporary";

export type Job = {
  id: string;
  jobCode: string;
  title: string;
  department: string;
  description: string;
  requiredSkills: string[];
  minimumExperienceYears: number;
  educationRequirement: string;
  employmentType: EmploymentType;
  location: string;
  vacancies: number;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
};

export type CandidateStatus = "submitted" | "reviewing" | "shortlisted" | "rejected" | "withdrawn";
export type ProcessingStatus = "pending" | "ready" | "failed";

export type UploadMeta = {
  originalName: string;
  storedName: string;
  relativePath: string;
  mimeType: string;
  sizeBytes: number;
  pageCount?: number;
  width?: number;
  height?: number;
};

export type Candidate = {
  id: string;
  candidateCode: string;
  jobId: string;
  job?: Job | null;
  fullName: string;
  email: string;
  phone: string;
  educationLevel: string;
  totalExperienceYears: number;
  currentJobTitle: string;
  skills: string[];
  expectedSalary?: number | null;
  currentLocation: string;
  resume: UploadMeta;
  resumeImage?: UploadMeta | null;
  consentGiven: boolean;
  status: CandidateStatus;
  processingStatus: ProcessingStatus;
  createdAt: string;
  updatedAt: string;
};

export type ListResponse<T> = {
  items: T[];
  pagination: Pagination;
};

const apiBaseUrl = () => (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

function withTimeout(signal?: AbortSignal, ms = 8000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), ms);
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }
  return { controller, timeout };
}

async function request<T>(path: string, init: RequestInit = {}, signal?: AbortSignal): Promise<ApiResult<T>> {
  const { controller, timeout } = withTimeout(signal);
  try {
    const response = await fetch(`${apiBaseUrl()}${path}`, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: init.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...(init.headers || {}) },
    });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json") ? await response.json() : null;
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: body?.detail || body?.message || `Backend returned ${response.status}.`,
        errors: body?.errors || {},
      };
    }
    if (body?.success === false) {
      return { ok: false, status: response.status, message: body.message || "Request failed.", errors: body.errors || {} };
    }
    return { ok: true, data: (body?.data ?? body) as T, message: body?.message };
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === "AbortError"
        ? "Backend request timed out."
        : error instanceof Error
          ? error.message
          : "Backend is unavailable.";
    return { ok: false, message };
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function fetchHealth(signal?: AbortSignal): Promise<ApiResult<HealthResponse>> {
  return request<HealthResponse>("/api/health", {}, signal);
}

export type JobPayload = Omit<Job, "id" | "jobCode" | "createdAt" | "updatedAt">;

export function listJobs(params: Record<string, string | number | undefined> = {}, signal?: AbortSignal) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && String(value)) search.set(key, String(value));
  });
  return request<ListResponse<Job>>(`/api/jobs?${search.toString()}`, {}, signal);
}

export function getJob(id: string, signal?: AbortSignal) {
  return request<Job>(`/api/jobs/${id}`, {}, signal);
}

export function createJob(payload: JobPayload, signal?: AbortSignal) {
  return request<Job>("/api/jobs", { method: "POST", body: JSON.stringify(payload) }, signal);
}

export function updateJob(id: string, payload: Partial<JobPayload>, signal?: AbortSignal) {
  return request<Job>(`/api/jobs/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, signal);
}

export function deleteJob(id: string, signal?: AbortSignal) {
  return request<Job>(`/api/jobs/${id}`, { method: "DELETE" }, signal);
}

export type CandidateFormValues = {
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  education_level: string;
  total_experience_years: string;
  current_job_title: string;
  skills: string;
  expected_salary: string;
  current_location: string;
  consent_given: boolean;
  resume: File | null;
  resume_image: File | null;
};

export function createCandidate(values: CandidateFormValues, signal?: AbortSignal) {
  const form = new FormData();
  form.set("job_id", values.job_id);
  form.set("full_name", values.full_name);
  form.set("email", values.email);
  form.set("phone", values.phone);
  form.set("education_level", values.education_level);
  form.set("total_experience_years", values.total_experience_years);
  form.set("current_job_title", values.current_job_title);
  form.set("skills", values.skills);
  if (values.expected_salary) form.set("expected_salary", values.expected_salary);
  form.set("current_location", values.current_location);
  form.set("consent_given", String(values.consent_given));
  if (values.resume) form.set("resume", values.resume);
  if (values.resume_image) form.set("resume_image", values.resume_image);
  return request<Candidate>("/api/candidates", { method: "POST", body: form }, signal);
}

export function listCandidates(params: Record<string, string | number | undefined> = {}, signal?: AbortSignal) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && String(value)) search.set(key, String(value));
  });
  return request<ListResponse<Candidate>>(`/api/candidates?${search.toString()}`, {}, signal);
}

export function getCandidate(id: string, signal?: AbortSignal) {
  return request<Candidate>(`/api/candidates/${id}`, {}, signal);
}

export function updateCandidateStatus(id: string, status: CandidateStatus, signal?: AbortSignal) {
  return request<Candidate>(`/api/candidates/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }, signal);
}

export function candidateResumeUrl(id: string) {
  return `${apiBaseUrl()}/api/candidates/${id}/resume`;
}
