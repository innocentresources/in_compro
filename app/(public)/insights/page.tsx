import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & News",
  description:
    "Latest press releases, corporate news, and insights from Innocent Resources Corporation Limited.",
};

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const PAGE_SIZE = 6;
  const currentPage = Math.max(Number(page) || 1, 1);

  const totalCount = await prisma.insight.count({
    where: { status: "PUBLISHED" },
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const insights = await prisma.insight.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-10">Insights & News</h1>

      {/* LIST */}
      {insights.length === 0 ? (
        <p>No insights found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;

            return (
              <Link
                key={pageNum}
                href={`/insights?page=${pageNum}`}
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
