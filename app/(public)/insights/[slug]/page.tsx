import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInsightBySlug, labelFor } from "@/lib/getInsights";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: "Insight not found" };
  return { title: insight.title, description: insight.excerpt };
}

export default async function InsightPage({ params }: { params: Params }) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <section className="section">
      <div className="wrap">
        <article className="article">
          <Link href="/insights" className="link-arrow">
            <span aria-hidden>←</span> All insights
          </Link>
          <div style={{ marginTop: 40 }}>
            <span className="eyebrow">{labelFor(insight.category)}</span>
          </div>
          <h1>{insight.title}</h1>
          <p style={{ marginTop: 16, color: "var(--muted)" }}>
            <time dateTime={insight.date.toISOString()}>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(insight.date)}
            </time>
          </p>
          <p className="lede">{insight.excerpt}</p>
          {insight.image && (
            <figure className="article-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={insight.image} alt="Copper-stained rock fragments" />
            </figure>
          )}
          <div className="body">{insight.content}</div>
        </article>
      </div>
    </section>
  );
}
