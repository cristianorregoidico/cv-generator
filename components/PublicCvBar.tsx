"use client";

type Props = {
  backHref?: string;
};

export function PublicCvBar({ backHref = "/builder" }: Props) {
  return (
    <div className="no-print sticky top-0 z-10 flex items-center justify-between rounded-b-xl border border-gray-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
      <div className="text-sm font-semibold text-gray-800">Print-ready CV</div>
      <div className="flex gap-2">
        <a
          href={backHref}
          className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:border-gray-300"
        >
          Back to builder
        </a>
        <button
          className="rounded-md bg-gray-900 px-3 py-1 text-sm font-semibold text-white hover:bg-black"
          onClick={() => window.print()}
        >
          Print
        </button>
      </div>
    </div>
  );
}
