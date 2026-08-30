"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  downloadBulkTemplate,
  getImportJob,
  getImportJobs,
  uploadBulkFile,
  type ImportJob,
} from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

// ── helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ImportJob["status"] }) {
  const map = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    done: "bg-emerald-50 text-emerald-700 border-emerald-200",
    failed: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${map[status]}`}
    >
      {status}
    </span>
  );
}

function ProgressBar({
  processed,
  total,
}: {
  processed: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((processed / total) * 100) : 0;
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function BulkUploadPage() {
  const { isAdmin } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [dryRun, setDryRun] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeJob, setActiveJob] = useState<ImportJob | null>(null);
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [expandedErrors, setExpandedErrors] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  // ── fetch job list ──
  const refreshJobs = useCallback(async () => {
    setJobsLoading(true);
    const data = await getImportJobs();
    setJobs(data);
    setJobsLoading(false);
  }, []);

  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  // ── polling ──
  const startPolling = useCallback((jobId: number) => {
    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const job = await getImportJob(jobId);
        setActiveJob(job);

        if (job.status === "done" || job.status === "failed") {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          refreshJobs();
        }
      } catch {
        clearInterval(pollRef.current!);
        pollRef.current = null;
      }
    }, 2000);
  }, [refreshJobs]);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  // ── actions ──
  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadBulkTemplate();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product_import_template.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(err.message || "Failed to download template");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setActiveJob(null);
    setExpandedErrors(false);

    try {
      const result = await uploadBulkFile(file, dryRun);
      const job = await getImportJob(result.job_id);
      setActiveJob(job);
      startPolling(result.job_id);
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const isDone = activeJob?.status === "done" || activeJob?.status === "failed";
  const isRunning =
    activeJob?.status === "pending" || activeJob?.status === "processing";

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#fafafa] p-6 md:p-10">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-4">
          Bulk Import
        </h1>
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-xl px-4 py-3">
          You have read-only (Viewer) access. Bulk import is disabled.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Bulk Import
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Upload an .xlsx file to create or update products in bulk.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Step 1 — Download Template */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              1
            </span>
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">
              Download Template
            </h2>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Get the official .xlsx template with all required columns and
            example rows pre-filled.
          </p>
          <button
            onClick={handleDownloadTemplate}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95"
          >
            <Download size={14} />
            Download Template
          </button>
        </div>

        {/* Step 2 — Upload File */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              2
            </span>
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">
              Upload File
            </h2>
          </div>

          {/* Drop zone */}
          <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:bg-blue-50/30 hover:border-blue-400 transition-all">
            <FileSpreadsheet
              size={28}
              className="text-gray-300 group-hover:text-blue-400 transition-colors"
            />
            <span className="mt-2 text-xs font-black text-gray-500 uppercase tracking-wide">
              {file ? file.name : "Choose .xlsx file"}
            </span>
            {file && (
              <span className="text-[10px] text-gray-400 mt-0.5">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {/* Dry run toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => setDryRun((v) => !v)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                dryRun ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  dryRun ? "translate-x-5" : ""
                }`}
              />
            </div>
            <span className="text-xs font-bold text-gray-600">
              Dry run{" "}
              <span className="text-gray-400 font-normal">
                (validate only, no writes)
              </span>
            </span>
          </label>

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#005bae] hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {uploading ? "Uploading…" : "Upload & Import"}
          </button>
        </div>

        {/* Step 3 — Live Status */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">
              3
            </span>
            <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">
              Import Status
            </h2>
          </div>

          {!activeJob ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-300">
              <Upload size={32} />
              <p className="text-xs mt-3 font-bold">
                Upload a file to see live progress
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status + job id */}
              <div className="flex items-center justify-between">
                <StatusBadge status={activeJob.status} />
                <span className="text-[10px] font-mono text-gray-400">
                  Job #{activeJob.id}
                  {activeJob.dry_run && (
                    <span className="ml-1 text-amber-500">(dry run)</span>
                  )}
                </span>
              </div>

              {/* Progress */}
              {activeJob.total_rows > 0 && (
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500">
                    <span>
                      {activeJob.rows_processed} / {activeJob.total_rows} rows
                    </span>
                    <span>
                      {Math.round(
                        (activeJob.rows_processed / activeJob.total_rows) * 100
                      )}
                      %
                    </span>
                  </div>
                  <ProgressBar
                    processed={activeJob.rows_processed}
                    total={activeJob.total_rows}
                  />
                </div>
              )}

              {/* Spinner while running */}
              {isRunning && (
                <div className="flex items-center gap-2 text-blue-600 text-xs font-bold">
                  <Loader2 size={14} className="animate-spin" />
                  Processing…
                </div>
              )}

              {/* Summary when done */}
              {isDone && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-emerald-50 rounded-xl p-2">
                    <p className="text-lg font-black text-emerald-700">
                      {activeJob.created_count ?? 0}
                    </p>
                    <p className="text-[9px] font-black uppercase text-emerald-600">
                      Created
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-2">
                    <p className="text-lg font-black text-blue-700">
                      {activeJob.updated_count ?? 0}
                    </p>
                    <p className="text-[9px] font-black uppercase text-blue-600">
                      Updated
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-2">
                    <p className="text-lg font-black text-red-700">
                      {activeJob.failed_count ?? 0}
                    </p>
                    <p className="text-[9px] font-black uppercase text-red-600">
                      Failed
                    </p>
                  </div>
                </div>
              )}

              {/* Errors accordion */}
              {isDone &&
                activeJob.errors &&
                activeJob.errors.length > 0 && (
                  <div>
                    <button
                      onClick={() => setExpandedErrors((v) => !v)}
                      className="flex items-center gap-1 text-xs font-black text-red-600 hover:text-red-800"
                    >
                      <AlertTriangle size={12} />
                      {activeJob.errors.length} row error
                      {activeJob.errors.length !== 1 ? "s" : ""}
                      {expandedErrors ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      )}
                    </button>

                    {expandedErrors && (
                      <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                        {activeJob.errors.map((e, i) => (
                          <div
                            key={i}
                            className="text-[10px] bg-red-50 border border-red-100 rounded p-2"
                          >
                            <span className="font-black text-red-700">
                              Row {e.row}:
                            </span>{" "}
                            <span className="text-red-600">{e.error}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Job History */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">
            Recent Import Jobs
          </h2>
          <button
            onClick={refreshJobs}
            disabled={jobsLoading}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition"
          >
            <RefreshCw
              size={13}
              className={jobsLoading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {jobsLoading ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            <Loader2 className="animate-spin mx-auto mb-2" size={20} />
            Loading jobs…
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-gray-300 text-sm font-bold">
            No import jobs yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    "Job ID",
                    "Status",
                    "Type",
                    "Rows",
                    "Created",
                    "Updated",
                    "Failed",
                    "Started",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => setActiveJob(job)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      #{job.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {job.status === "done" && (
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />
                        )}
                        {job.status === "failed" && (
                          <XCircle size={14} className="text-red-500" />
                        )}
                        {(job.status === "pending" ||
                          job.status === "processing") && (
                          <Loader2
                            size={14}
                            className="text-blue-500 animate-spin"
                          />
                        )}
                        <StatusBadge status={job.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {job.dry_run ? (
                        <span className="text-amber-600 font-bold">
                          Dry Run
                        </span>
                      ) : (
                        <span className="text-gray-400">Live</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 font-bold">
                      {job.rows_processed ?? 0} / {job.total_rows ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-emerald-700 font-bold">
                      {job.created_count ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-blue-700 font-bold">
                      {job.updated_count ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-red-600 font-bold">
                      {job.failed_count ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[10px] text-gray-400 font-mono">
                      {new Date(job.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
