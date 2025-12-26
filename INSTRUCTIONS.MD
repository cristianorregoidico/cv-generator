# Codex Prompt — Developer CV Builder Web App

Build a web application to generate **developer CVs**, inspired by  
https://print-portfolio.vercel.app/

The app must generate a **web-based CV** that can be printed to PDF and remain **nearly identical** between screen and print.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- No authentication or user accounts
- Persistence: **filesystem-based JSON storage** on the server (preferred over SQLite for simplicity)

---

## Pages & Routing

### 1. Landing Page `/`

- Marketing-style landing page introducing the CV generator
- Sections:
  - Hero headline + short description
  - Key benefits (print-friendly, clean design, developer-focused)
  - Theme previews (Slate, Teal, Rose)
- Prominent **CTA button**:  
  **“Create your CV”**
- CTA navigates to `/builder`

---

### 2. Builder Page `/builder`

- Form-based CV editor
- **Preview is hidden by default**
- Button: **“Preview CV”**

#### Preview behavior
- Preview opens **only when clicking the button**
- Appears as a **full-screen overlay/modal**
- CV preview is:
  - Fully centered horizontally and vertically
  - Isolated from the editor UI
- Overlay controls:
  - Close preview
  - Print
  - Optional: Download JSON

Editor becomes accessible again only after closing preview.

---

### 3. Public CV Page `/cv/[slug]`

- Generated after saving a CV
- Example URL:
  ```
  https://domain.com/cv/username-slug
  ```
- Renders the CV using the selected theme
- Print-ready
- Optional minimal top bar (hidden on print):
  - Print
  - Back to builder

---

## CV Data Model

Define a strict TypeScript interface `CvData` and a `defaultCv`.

### Fields

- **Profile**
  - Full name
  - Role / title
  - Location
  - Email
  - Phone
  - Links (LinkedIn, GitHub, website)
  - About / summary
- **Experience** (repeatable)
  - Company
  - Role
  - Start / end dates
  - Bullet points
- **Education** (repeatable)
- **Projects** (repeatable)
  - Name
  - Link
  - Description
  - Highlights / tags
  - Tech stack
- **Skills** (tag list)
- Optional:
  - Languages
  - Certifications
- Selected theme + accent color

---

## Themes & Colors

Provide exactly **3 themes**:

- **Slate** (default)
- **Teal**
- **Rose**

### Theme rules

- Accent color used for:
  - Headings
  - Section dividers
  - Tags / highlights
  - Icons
- Use CSS variables:
  - `--accent`
  - `--text`
  - `--muted`
  - `--background`
- Apply via:
  ```html
  data-theme="slate | teal | rose"
  ```

---

## Persistence & Saving

### Storage approach
- Use **filesystem-based JSON storage**
- Store CV files under:
  ```
  /data/cv/<slug>.json
  ```

### API routes

- `POST /api/cv`
  - Saves CV JSON to filesystem
  - Generates a URL-safe slug from user name
  - Ensures directory exists
  - Returns `{ slug }`

- `GET /api/cv/[slug]`
  - Reads and returns the stored CV JSON

### Builder save flow

- **Save button**
  - Minimal validation (name and role required)
  - Calls `POST /api/cv`
  - On success:
    - Shows generated URL
    - Button: “Open public CV”
- Persist draft state in `localStorage` to prevent data loss on refresh

---

## JSON Import / Export

- **Download JSON**
  - Exports full CV data
  - Includes theme and base64 photo
- **Upload JSON**
  - Reads file
  - Validates schema
  - Repopulates editor
- Include:
  - `validateOrMigrateCvJson` utility

---

## Photo Upload

- Accept JPG / PNG
- Convert to **base64 Data URL**
- Store in state and JSON
- Show preview in editor and CV

---

## Printing Requirements

- CV preview and `/cv/[slug]` must be print-optimized
- Use `@media print`:
  - Hide UI controls
  - Remove overlays
- Set page size:
  ```css
  @page {
    size: A4;
    margin: 20mm;
  }
  ```
- Prevent awkward page breaks:
  ```css
  break-inside: avoid;
  ```
- Printed output must visually match the web preview as closely as possible

---

## Components

- `LandingPage`
- `BuilderPage`
- `CvEditor`
- `CvPreviewOverlay`
- `CvTemplate` (shared renderer for preview and public page)
- `ThemeSelector`
- `PhotoUploader`
- `SortableList` (up/down controls)

### Utilities
- `slugify`
- `downloadJson`
- `readJsonFile`
- `validateOrMigrateCvJson`

---

## Deliverables

- Fully working Next.js project
- No pseudocode
- README including:
  - How to run the project
  - How filesystem persistence works
  - Where CV files are stored
  - How to print to PDF
  - How to add a new theme

---

## Acceptance Criteria

- Landing page exists with CTA → builder
- Preview hidden by default, shown only via button
- Preview is full-screen and centered
- Save creates JSON file on server
- Public route `/cv/[slug]` works
- Themes: Slate (default), Teal, Rose
- Printed CV matches web preview closely

Implement everything end-to-end.
