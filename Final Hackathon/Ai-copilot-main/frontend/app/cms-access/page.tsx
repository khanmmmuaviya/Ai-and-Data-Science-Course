import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Access",
  robots: { index: false, follow: false },
};

export default async function CmsAccess({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const error =
    params.error === "rate"
      ? "Too many attempts. Please wait and try again."
      : params.error
        ? "Invalid credentials."
        : "";

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action="/api/cms-auth/login" method="post" className="card w-full max-w-md p-6">
        <p className="text-sm font-semibold text-primary">Protected content gateway</p>
        <h1 className="mt-2 text-2xl font-semibold text-primary-strong">Sign in</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Access is restricted to authorized maintainers. Sanity project membership is still required.</p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input name="email" type="email" required autoComplete="email" className="rounded-lg border border-line bg-white px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Password
            <input name="password" type="password" required autoComplete="current-password" className="rounded-lg border border-line bg-white px-3 py-2" />
          </label>
        </div>
        {error && <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-strong">
          Continue
        </button>
      </form>
    </main>
  );
}
