import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = await params;

  const insight = await prisma.insight.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      title: true,
      excerpt: true,
    },
  });

  if (!insight) {
    return { title: "Insight Not Found" };
  }

  return {
    title: insight.title,
    description: insight.excerpt || insight.title,
  };
}

export default async function InsightDetailPage(
  { params }: { params: Params }
) {
  const { slug } = await params;

  const insight = await prisma.insight.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });

  if (!insight) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        {insight.title}
      </h1>

      {insight.coverImage && (
        <img
          src={insight.coverImage}
          alt={insight.title}
          className="mb-8 rounded-lg"
        />
      )}

      <div className="text-gray-500 mb-6">
        {new Date(insight.createdAt).toLocaleDateString()}
      </div>

      <div className="prose prose-lg max-w-none">
        {insight.content}
      </div>
    </article>
  );
}
