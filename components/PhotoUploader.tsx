/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent } from "react";

type Props = {
  value?: string;
  onChange: (dataUrl?: string) => void;
};

export function PhotoUploader({ value, onChange }: Props) {
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a JPG or PNG image.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === "string" ? reader.result : undefined;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-800">Photo</label>
      {value ? (
        <div className="flex items-center gap-3">
          <img
            src={value}
            alt="Profile"
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />
          <button
            type="button"
            className="rounded-md border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:border-gray-300"
            onClick={() => onChange(undefined)}
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">Optional JPG or PNG. Stored as base64.</p>
      )}
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFile}
        className="text-sm"
      />
    </div>
  );
}
