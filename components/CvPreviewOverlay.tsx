"use client";

import { CvData } from "@/lib/cv";
import { downloadJson } from "@/lib/downloadJson";
import { CvTemplate } from "./CvTemplate";

type Props = {
  open: boolean;
  data: CvData;
  onClose: () => void;
};

export function CvPreviewOverlay({ open, data, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 print:static print:bg-transparent print:p-0">
      <div className="absolute left-4 top-4 flex gap-3 print:hidden">
        <button
          onClick={onClose}
          className="rounded-md bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-white"
        >
          Close
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
        >
          Print
        </button>
        <button
          onClick={() => downloadJson(data, "cv.json")}
          className="rounded-md bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-white"
        >
          Download JSON
        </button>
      </div>

      <div className="flex max-h-full w-full items-center justify-center overflow-auto print:block">
        <div className="flex items-center justify-center print:block">
          <CvTemplate data={data} />
        </div>
      </div>
    </div>
  );
}
