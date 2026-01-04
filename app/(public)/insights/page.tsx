import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Prisma, InsightCategory } from "@prisma/client";
import { Suspense } from "react";
import InsightsFilter from "./InsightsFilter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights & News",
  description:
    "Latest press releases, corporate news, and insights from Innocent Resources Corporation Limited.",
};

const PAGE_SIZE = 6;

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
  }>;
}) {
  const { page, q, category } = await searchParams;

  const currentPage = Math.max(Number(page) || 1, 1);

  const where: Prisma.InsightWhereInput = {
    status: "PUBLISHED",
  };

  if (q) {
    where.OR = [
      {
        title: {
          contains: q,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      {
        excerpt: {
          contains: q,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    ];
  }

  if (
    category &&
    Object.values(InsightCategory).includes(category as InsightCategory)
  ) {
    where.category = category as InsightCategory;
  }

  const totalCount = await prisma.insight.count({ where });
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const insights = await prisma.insight.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Insights & News</h1>

      <Suspense fallback={<InsightsFilterSkeleton />}>
        <InsightsFilter />
      </Suspense>

      {insights.length === 0 ? (
        <p className="mt-10 text-gray-500">No insights found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {insights.map((item) => (
            <article
              key={item.id}
              className="border rounded-lg overflow-hidden"
            >
              {item.coverImage && (
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase text-red-600">
                  {item.category.replace("_", " ")}
                </p>

                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/insights/${item.slug}`}>
                    {item.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-700 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;

            const params = new URLSearchParams();
            params.set("page", String(pageNum));
            if (q) params.set("q", q);
            if (category) params.set("category", category);

            return (
              <Link
                key={pageNum}
                href={`/insights?${params.toString()}`}
                className={`px-4 py-2 border rounded ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

function InsightsFilterSkeleton() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center animate-pulse">
      <div className="h-10 w-full md:w-1/2 rounded bg-gray-200" />
      <div className="h-10 w-full md:w-56 rounded bg-gray-200" />
      <div className="h-10 w-28 rounded bg-gray-200" />
    </div>
  );
}
