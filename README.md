# Developer CV Generator

Next.js (App Router) app for building print-perfect developer CVs. The experience mirrors the web preview when printed to PDF. Data is saved as JSON on the filesystem for simplicity—no accounts or databases required.

## Getting Started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## How It Works

- Landing page (`/`) with CTA to start building.
- Builder (`/builder`) contains the form-based editor, JSON import/export, and full-screen preview overlay (hidden until you click **Preview CV**).
- Save sends a POST to `/api/cv`, writing JSON to `data/cv/<slug>.json` and returning the slug.
- Public CV route (`/cv/[slug]`) reads the stored JSON and renders the same template ready for printing.

### Filesystem Persistence

- Storage directory: `data/cv/`
- Each save writes `<slug>.json`. Slugs are generated from the full name with a numeric suffix when needed.
- Utilities: `lib/storage.ts`, `lib/slugify.ts`, `lib/readJsonFile.ts`, `lib/validateOrMigrateCvJson.ts`.

### Printing

- Preview overlay centers the A4 CV; click **Print** from the overlay or the public CV bar.
- `@page` is set to `A4` with `20mm` margins; sections use `break-inside: avoid` for clean page breaks.
- Controls and chrome use the `no-print` class so only the CV renders on paper/PDF.

### Themes

- Three built-in palettes: Slate (default), Teal, Rose.
- Theme variables (`--accent`, `--text`, `--muted`, `--background`) are applied via `data-theme` on the template.
- Accent color can be overridden per CV. Add a new theme by updating `lib/themes.ts` and the selectors in `components/ThemeSelector.tsx` plus the CSS tokens in `app/globals.css`.

### JSON Import/Export

- Download the full CV (including base64 photo and theme) with **Download JSON**.
- Upload a JSON file in the builder; `validateOrMigrateCvJson` normalizes/guards the payload before populating the editor.

## Printing to PDF

1. Open `/builder`, click **Preview CV**.
2. In the overlay, click **Print** (or open `/cv/<slug>` and print from there).
3. In the browser print dialog select **Save as PDF**, keep A4 and default margins for the closest match.

## Scripts

- `npm run dev` – start the dev server.
- `npm run lint` – lint the project.
- `npm run build` / `npm start` – production build and serve.
