"use client";

import Link from "next/link";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
  publishedAt: string;
};

const mockInsights: Insight[] = [
  {
    id: "1",
    title: "Innocent Resources Advances Exploration Activities in Namibia",
    slug: "innocent-resources-advances-exploration-activities-in-namibia",
    excerpt:
      "The company has expanded its exploration footprint in Namibia.",
    category: "PRESS_RELEASE",
    publishedAt: "2025-01-10",
  },
  // add more mock items here
];

export default function InsightsClient({
  page,
  pageSize,
  category,
}: {
  page: number;
  pageSize: number;
  category: string | null;
}) {
  const filtered = category
    ? mockInsights.filter(
        (i) => i.category === category.toUpperCase()
      )
    : mockInsights;

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold">Insights</h1>
        <p className="text-gray-600 mt-2">
          Press releases, updates, and corporate insights
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {paginated.map((item) => (
          <article
            key={item.id}
            className="border rounded-lg p-6 bg-white hover:shadow transition"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-red-700">
              {item.category.replace("_", " ")}
            </span>

            <h2 className="text-lg font-semibold mt-2">
              <Link href={`/insights/${item.slug}`}>
                {item.title}
              </Link>
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              {item.excerpt}
            </p>

            <time className="block mt-4 text-xs text-gray-400">
              {new Date(item.publishedAt).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-12">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/insights?page=${i + 1}${
              category ? `&category=${category}` : ""
            }`}
            className={`px-3 py-1 rounded border text-sm ${
              page === i + 1
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </main>
  );
}
