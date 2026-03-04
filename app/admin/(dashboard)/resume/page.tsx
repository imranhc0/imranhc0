import { uploadResumeAction } from "@/app/admin/actions";
import { FlashBanner } from "@/components/admin/flash-banner";
import { SubmitButton } from "@/components/ui/submit-button";
import { formatDate } from "@/lib/format";
import { getAdminResume } from "@/lib/supabase";

interface AdminResumePageProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function AdminResumePage({ searchParams }: AdminResumePageProps) {
  const { success, error } = await searchParams;
  const resume = await getAdminResume();

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">Content</p>
          <h2 className="text-3xl font-black text-[var(--ink)]">Resume</h2>
        </div>
      </div>

      <FlashBanner message={success} type="success" />
      <FlashBanner message={error} type="error" />

      <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
        <h3 className="text-lg font-black text-[var(--ink)]">Upload Resume</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Upload a PDF, DOC, or DOCX file. The latest file is shown as a download button on your public homepage.
        </p>

        <form action={uploadResumeAction} className="mt-4 space-y-4" encType="multipart/form-data">
          <label className="space-y-2 text-sm font-semibold text-[var(--ink)]">
            Resume file
            <input
              required
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="w-full rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm"
            />
          </label>

          <SubmitButton
            pendingLabel="Uploading..."
            className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            Upload Resume
          </SubmitButton>
        </form>
      </section>

      <section className="rounded-2xl border border-[var(--line)] bg-white p-5">
        <h3 className="text-lg font-black text-[var(--ink)]">Current Resume</h3>
        {resume?.publicUrl ? (
          <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
            <p>
              <span className="font-semibold text-[var(--ink)]">File:</span> {resume.fileName}
            </p>
            <p>
              <span className="font-semibold text-[var(--ink)]">Last updated:</span> {formatDate(resume.updatedAt)}
            </p>
            <a
              href={`${resume.publicUrl}?download=${encodeURIComponent(resume.fileName)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink)] transition hover:border-[var(--ink)]"
            >
              Download Current Resume
            </a>
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">No resume uploaded yet.</p>
        )}
      </section>
    </main>
  );
}
