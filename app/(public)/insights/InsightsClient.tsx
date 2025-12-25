"use client";

import Link from "next/link";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage?: string | null;
  createdAt: string;
};

export default function InsightsClient({ data }: { data: Insight[] }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Insights</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {data.map((item) => (
          <article
            key={item.id}
            className="border rounded-lg overflow-hidden bg-white hover:shadow transition"
          >
            {item.coverImage && (
              <div className="aspect-[16/9] bg-gray-100">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <span className="text-xs font-semibold uppercase text-red-700">
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
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
