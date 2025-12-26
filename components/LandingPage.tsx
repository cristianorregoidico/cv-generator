import Link from "next/link";
import { themeTokens } from "@/lib/themes";

const features = [
  { title: "Multiple Themes", body: "Pick from curated palettes built for developers." },
  { title: "Photo Upload", body: "Add a professional headshot that stays sharp in print." },
  { title: "JSON Import", body: "Import your CV JSON to jumpstart editing instantly." },
  { title: "Shareable URLs", body: "Publish to a unique slug you can share anywhere." },
  { title: "Easy Sharing", body: "Send a single link—no attachments required." },
  { title: "Print Ready", body: "A4-friendly exports that mirror the on-screen preview." },
];

const howItWorks = [
  { step: "01", title: "Choose a Theme", body: "Select Slate, Teal, or Rose to set your tone." },
  { step: "02", title: "Add Your Information", body: "Paste or import JSON; upload a photo if you like." },
  { step: "03", title: "Customize & Preview", body: "Toggle preview to see the exact print layout." },
  { step: "04", title: "Share & Export", body: "Save to get your public URL or print to PDF." },
];

export function LandingPage() {
  return (
    <div className="bg-[#f6f8fb] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:pt-12">
        <nav className="mb-10 flex items-center justify-between px-4 py-3 ">
          <div className="text-lg font-semibold text-slate-900">CV4Devs</div>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 px-2 py-2 text-slate-700 hover:border-slate-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
            </a>
            <Link
              href="/builder"
              className="rounded-full bg-slate-900 px-3 py-2 text-white shadow-sm hover:bg-black"
              style={{ color: "#fff" }}
            >
              Try it out
            </Link>
          </div>
        </nav>
        <header className="text-center space-y-6 min-h-150 mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <span className="text-slate-800 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" /></svg>
              Built for developers, by developers
              </span>
          </div>
          <div className="space-y-3 mt-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-7xl md:w-[20ch] md:m-auto md:mt-8">
              Create Your Perfect Developer CV in Minutes
            </h1>
            <p className="my-8 text-lg text-slate-600 md:w-[50ch] md:m-auto md:my-10">
              Professional, customizable CVs with shareable links and print-ready exports. Choose a
              theme, import your data, and share your unique URL.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/builder"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black flex items-center gap-1"
              style={{ color: "#fff" }}
            >
              Get Started <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
            </Link>
            <Link
              href="/cv/demo"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400"
            >
              View Example
            </Link>
          </div>

        </header>

        <section className="mt-16 space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Everything you need to showcase your skills
            </h2>
            <p className="mt-2 text-slate-600">
              Build a professional developer CV with all the features you need to stand out.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
              >
                <p className="text-lg font-semibold text-slate-900">{feature.title}</p>
                <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="themes" className="mt-16 space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Choose Your Perfect Theme</h2>
            <p className="mt-2 text-slate-600">
              Select from curated themes designed to highlight your unique professional brand.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {(["slate", "teal", "rose"] as const).map((theme) => {
              const palette = themeTokens[theme];
              const labels: Record<string, string> = {
                slate: "Classic",
                teal: "Modern",
                rose: "Creative",
              };
              return (
                <div
                  key={theme}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="h-24 w-full"
                    style={{
                      background: `linear-gradient(135deg, ${palette.accent}, ${palette.background})`,
                    }}
                  />
                  <div className="p-4 text-left">
                    <p className="text-lg font-semibold text-slate-900">{labels[theme]}</p>
                    <p className="text-sm text-slate-600 capitalize">{theme} palette</p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600 shadow-sm">
              + More accents available in the builder
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">How It Works</h2>
            <p className="mt-2 text-slate-600">Create your professional developer CV in four steps.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm"
              >
                <p className="text-xl font-semibold text-slate-400">{item.step}</p>
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">Ready to Create Your CV?</h2>
          <p className="mt-2 text-slate-600">
            Join developers creating professional CVs with a single click. Start free today.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/builder"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black"
              style={{ color: "#fff" }}
            >
              Start Building Now
            </Link>
            <Link
              href="/cv/alex-deverson-1"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400"
            >
              View Demo
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-600">
            <span>• No credit card required</span>
            <span>• Free forever plan</span>
            <span>• Export to PDF</span>
          </div>
        </section>
      </div>
    </div>
  );
}
