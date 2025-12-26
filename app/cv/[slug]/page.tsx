import { CvTemplate } from "@/components/CvTemplate";
import { PublicCvBar } from "@/components/PublicCvBar";
import { readCvFromDisk } from "@/lib/storage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ParamsPromise = Promise<{ slug: string | string[] }>;

export async function generateMetadata({
  params,
}: {
  params: ParamsPromise;
}): Promise<Metadata> {
  const resolved = await params;
  const slugParam = Array.isArray(resolved.slug) ? resolved.slug[0] : resolved.slug;
  return {
    title: slugParam ? `CV | ${slugParam}` : "CV",
  };
}

export default async function Page({ params }: { params: ParamsPromise }) {
  const resolved = await params;
  const slugParam = Array.isArray(resolved.slug) ? resolved.slug[0] : resolved.slug;
  if (!slugParam) return notFound();

  let data;
  try {
    data = await readCvFromDisk(decodeURIComponent(slugParam));
  } catch (error) {
    console.error(error);
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-5xl space-y-4">
        <PublicCvBar />
        <div className="flex justify-center">
          <CvTemplate data={data} />
        </div>
      </div>
    </div>
  );
}
