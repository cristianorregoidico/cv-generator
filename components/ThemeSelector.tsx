"use client";

import { themeTokens } from "@/lib/themes";
import { ThemeName } from "@/lib/cv";

type Props = {
  value: ThemeName;
  accentColor?: string;
  onChange: (theme: ThemeName) => void;
  onAccentChange: (color?: string) => void;
};

const entries = [
  { key: "slate" as ThemeName, label: "Slate" },
  { key: "teal" as ThemeName, label: "Teal" },
  { key: "rose" as ThemeName, label: "Rose" },
];

export function ThemeSelector({
  value,
  onChange,
  accentColor,
  onAccentChange,
}: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">Theme</p>
          <p className="text-xs text-gray-600">Three curated palettes.</p>
        </div>
        <input
          type="color"
          aria-label="Accent color override"
          title="Accent color"
          value={accentColor || themeTokens[value].accent}
          onChange={(e) => onAccentChange(e.target.value)}
          className="h-9 w-9 cursor-pointer overflow-hidden rounded-md border border-gray-200 bg-white shadow-inner"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {entries.map((entry) => {
          const tokens = themeTokens[entry.key];
          const isActive = value === entry.key;
          return (
            <button
              key={entry.key}
              type="button"
              className={`flex flex-col items-start rounded-lg border p-4 text-left transition ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => onChange(entry.key)}
            >
              <span className="text-sm font-semibold">{entry.label}</span>
              <div className="mt-3 flex w-full items-center gap-1">
                <span
                  className="h-8 flex-1 rounded-md"
                  style={{ background: tokens.accent }}
                />
                <span
                  className="h-8 flex-1 rounded-md"
                  style={{ background: tokens.background }}
                />
              </div>
              <span className="mt-2 text-[11px] uppercase tracking-wide text-gray-500">
                Accent driven layout
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
