import Link from "next/link";
import { themeTokens } from "@/lib/themes";

const benefits = [
  {
    title: "Print-perfect",
    body: "A4-friendly layout, no surprises between screen and PDF.",
  },
  {
    title: "Developer-first",
    body: "Fields that showcase engineering impact, projects, and tech stack.",
  },
  {
    title: "Simple storage",
    body: "JSON saved on the filesystem. No accounts, no fuss.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <header className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Print-ready CVs
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Build a developer CV that looks identical online and on paper.
            </h1>
            <p className="text-lg text-slate-200">
              Inspired by print-portfolio layouts. Choose a theme, fill your impact, preview
              fullscreen, and print to PDF with zero surprises.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/builder"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-white/20"
              >
                Create your CV
              </Link>
              <Link
                href="#themes"
                className="rounded-full border border-slate-500 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                See themes
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                  Preview Snapshot
                </p>
                <p className="text-2xl font-semibold">Developer CV</p>
              </div>
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
                A4 Ready
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-slate-100">
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span>Slate theme</span>
                <span className="pill bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  Default
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span>Print-safe layout</span>
                <span className="text-xs text-slate-200">A4, 20mm margins</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <span>JSON export</span>
                <span className="text-xs text-slate-200">Import / download</span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20"
            >
              <p className="text-lg font-semibold">{benefit.title}</p>
              <p className="mt-2 text-sm text-slate-200">{benefit.body}</p>
            </div>
          ))}
        </section>

        <section id="themes" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Themes</p>
              <h2 className="text-2xl font-semibold">Slate, Teal, Rose</h2>
            </div>
            <Link
              href="/builder"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:-translate-y-0.5 hover:shadow-white/30"
            >
              Start building
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(["slate", "teal", "rose"] as const).map((theme) => {
              const palette = themeTokens[theme];
              return (
                <div
                  key={theme}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20"
                >
                  <p className="text-lg font-semibold capitalize">{theme}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="h-10 flex-1 rounded-md"
                      style={{ background: palette.accent }}
                    />
                    <span
                      className="h-10 flex-1 rounded-md"
                      style={{ background: palette.background }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-200">
                    Accent-driven section dividers, muted text, and tag styling that match on
                    screen and print.
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
