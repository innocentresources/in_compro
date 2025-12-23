import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/lib/insightData";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const insight = insights.find(
    (item) => item.slug === params.slug && item.status === "PUBLISHED"
  );

  if (!insight) {
    return {
      title: "Insight Not Found",
      description: "The requested insight could not be found.",
    };
  }

  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
    },
  };
}

export default function InsightDetailPage({ params }: Props) {
  const insight = insights.find(
    (item) => item.slug === params.slug && item.status === "PUBLISHED"
  );

  if (!insight) {
    notFound();
  }

  const relatedInsights = insights
    .filter(
      (item) =>
        item.status === "PUBLISHED" &&
        item.category === insight.category &&
        item.slug !== insight.slug
    )
    .slice(0, 3);

  const fallbackInsights =
    relatedInsights.length < 3
      ? insights
          .filter(
            (item) =>
              item.status === "PUBLISHED" &&
              item.slug !== insight.slug
          )
          .slice(0, 3)
      : relatedInsights;

  const finalRelated =
    relatedInsights.length > 0 ? relatedInsights : fallbackInsights;

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <article>
        {insight.image && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={insight.image}
              alt={insight.title}
              className="w-full h-[320px] object-cover"
            />
          </div>
        )}

        <span className="text-xs font-semibold uppercase tracking-widest text-red-700">
          {insight.category.replace("_", " ")}
        </span>

        <h1 className="mt-3 text-3xl font-semibold leading-tight">
          {insight.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {insight.excerpt}
        </p>

        <time className="mt-4 block text-sm text-gray-400">
          {new Date(insight.publishedAt).toLocaleDateString()}
        </time>

        <div className="mt-10 space-y-5 text-gray-700 leading-relaxed">
          {insight.content.split("\n").map((line, index) =>
            line.trim() ? (
              <p key={index}>{line}</p>
            ) : null
          )}
        </div>
      </article>

      {finalRelated.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold mb-6">
            Related Insights
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {finalRelated.map((item) => (
              <Link
                key={item.id}
                href={`/insights/${item.slug}`}
                className="block rounded-lg border border-gray-200 bg-white hover:shadow-md transition"
              >
                <div className="h-40 bg-gray-100 overflow-hidden rounded-t-lg">
                  <img
                    src={item.image || "/sample.jpg"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-700">
                    {item.category.replace("_", " ")}
                  </span>

                  <h3 className="mt-2 text-sm font-semibold">
                    {item.title}
                  </h3>

                  <time className="mt-2 block text-xs text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
