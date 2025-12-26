"use client";

import { useEffect, useMemo, useState } from "react";
import { CvData, defaultCv } from "@/lib/cv";
import { validateOrMigrateCvJson } from "@/lib/validateOrMigrateCvJson";
import { CvEditor } from "./CvEditor";
import { downloadJson } from "@/lib/downloadJson";
import { CvTemplate } from "./CvTemplate";
import { ThemeSelector } from "./ThemeSelector";

const DRAFT_KEY = "cv-generator-draft";

export function BuilderPage() {
  const [cv, setCv] = useState<CvData>(defaultCv);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [showThemes, setShowThemes] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(DRAFT_KEY) : null;
    if (saved) {
      try {
        const parsed = validateOrMigrateCvJson(JSON.parse(saved));
        setCv(parsed);
      } catch (error) {
        console.error("Failed to load draft", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(cv));
  }, [cv]);

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = validateOrMigrateCvJson(JSON.parse(text));
      setCv(parsed);
      setMessage("JSON imported into the editor.");
    } catch (error) {
      setMessage("Invalid JSON file. Could not import.");
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!cv.profile.fullName || !cv.profile.role) {
      setMessage("Full name and role are required before saving.");
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      });
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const { slug } = await res.json();
      setSavedSlug(slug);
      setMessage("Saved! Public link ready below.");
      setMode("preview");
    } catch (error) {
      console.error(error);
      setMessage("Failed to save CV. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const publicUrl = useMemo(
    () => (savedSlug && origin ? `${origin}/cv/${savedSlug}` : savedSlug ? `/cv/${savedSlug}` : null),
    [savedSlug, origin]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between no-print">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Developer CV Builder
            </p>
            <h1 className="text-3xl font-semibold text-gray-900">Craft a print-perfect CV</h1>
          </div>
          {savedSlug ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Saved as <span className="font-semibold">{savedSlug}</span>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm no-print space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
                mode === "edit"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-800"
              }`}
              onClick={() => setMode("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
                mode === "preview"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 bg-white text-gray-800"
              }`}
              onClick={() => setMode("preview")}
            >
              Preview
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save & Publish"}
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-gray-300"
              onClick={() => downloadJson(cv)}
            >
              Download JSON
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-gray-300"
              onClick={() => window.print()}
              disabled={mode !== "preview"}
              title={mode === "preview" ? "Print preview" : "Switch to preview to print"}
            >
              Print
            </button>
            <div className="flex-1" />
            <button
              type="button"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:border-gray-300"
              onClick={() => setShowThemes((prev) => !prev)}
            >
              {showThemes ? "Hide themes" : "Choose theme"}
            </button>
          </div>
          {showThemes && (
            <div className="rounded-lg border border-gray-200 bg-white/70 p-4 shadow-sm">
              <ThemeSelector
                value={cv.theme}
                accentColor={cv.accentColor}
                onChange={(theme) => setCv({ ...cv, theme, accentColor: undefined })}
                onAccentChange={(accentColor) => setCv({ ...cv, accentColor })}
              />
            </div>
          )}
          {publicUrl && (
            <div className="mt-3 text-sm text-gray-700">
              Public URL:{" "}
              <a className="font-semibold text-indigo-700 underline" href={publicUrl}>
                {publicUrl}
              </a>
              <a
                className="ml-3 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:border-gray-300"
                href={`/cv/${savedSlug}`}
              >
                Open public CV
              </a>
            </div>
          )}
          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
        </div>

        {mode === "edit" ? (
          <div className="no-print">
            <CvEditor
              value={cv}
              onChange={setCv}
              onImport={handleImport}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm no-print">
              <p className="font-semibold text-gray-900">Preview mode</p>
              <p>Use the buttons above to print or go back to editing.</p>
            </div>
            <div className="flex justify-center">
              <CvTemplate data={cv} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
