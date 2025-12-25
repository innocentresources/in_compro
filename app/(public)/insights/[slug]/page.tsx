import type { Metadata } from "next";
import InsightDetailClient from "./InsightDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/insights/${params.slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return { title: "Insight Not Found" };
    }

    const data = await res.json();

    return {
      title: `${data.title} | Insights`,
      description: data.excerpt,
      openGraph: {
        title: data.title,
        description: data.excerpt,
        type: "article",
      },
    };
  } catch {
    return { title: "Insights" };
  }
}

export default function InsightDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <InsightDetailClient slug={params.slug} />;
}
