import { NextResponse } from "next/server";
import { validateOrMigrateCvJson } from "@/lib/validateOrMigrateCvJson";
import { slugify } from "@/lib/slugify";
import { getCvFilePath, writeCvToDisk, ensureStorageDir } from "@/lib/storage";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const cv = validateOrMigrateCvJson(payload);
    const base = slugify(cv.profile.fullName || "cv");
    await ensureStorageDir();

    let slug = base;
    let attempts = 1;
    while (await fileExists(getCvFilePath(slug))) {
      slug = `${base}-${attempts}`;
      attempts += 1;
    }

    await writeCvToDisk(slug, cv);
    return NextResponse.json({ slug });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save CV" },
      { status: 400 }
    );
  }
}

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
