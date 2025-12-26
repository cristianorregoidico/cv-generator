import { promises as fs } from "fs";
import path from "path";

export async function readJsonFile<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(process.cwd(), relativePath);
  const contents = await fs.readFile(fullPath, "utf-8");
  return JSON.parse(contents) as T;
}
