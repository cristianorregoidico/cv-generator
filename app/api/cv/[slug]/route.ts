import { readCvFromDisk } from "@/lib/storage";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const cv = await readCvFromDisk(params.slug);
    return NextResponse.json(cv);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
