import { promises as fs } from "fs";
import path from "path";
import { CvData } from "./cv";
import { validateOrMigrateCvJson } from "./validateOrMigrateCvJson";

const baseDir = path.join(process.cwd(), "data", "cv");

export function getCvFilePath(slug: string) {
  return path.join(baseDir, `${slug}.json`);
}

export async function ensureStorageDir() {
  await fs.mkdir(baseDir, { recursive: true });
}

export async function readCvFromDisk(slug: string): Promise<CvData> {
  if (!slug || typeof slug !== "string") {
    throw new Error("Missing slug");
  }
  const file = getCvFilePath(slug);
  const contents = await fs.readFile(file, "utf-8");
  return validateOrMigrateCvJson(JSON.parse(contents));
}

export async function writeCvToDisk(slug: string, data: CvData) {
  await ensureStorageDir();
  const file = getCvFilePath(slug);
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}
