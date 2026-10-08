import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedInsights, labelFor } from "@/lib/getInsights";
import InsightsFilter from "./InsightsFilter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Press releases, news and updates from Innocent Resources Corporation Limited.",
};

const PAGE_SIZE = 6;

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const { page, q, category } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);

  const needle = q?.trim().toLowerCase();
  const filtered = (await getPublishedInsights()).filter(
    (i) =>
      (!category || i.category === category) &&
      (!needle ||
        i.title.toLowerCase().includes(needle) ||
        i.excerpt.toLowerCase().includes(needle))
  );

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const items = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <section className="page-hero photo-hero hero-insights">
        <div className="wrap">
          <span className="eyebrow light">Insights</span>
          <h1 className="display">News and company updates.</h1>
          <p className="lede">
            Press releases and updates from Innocent Resources Corporation
            Limited.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Suspense fallback={null}>
            <InsightsFilter />
          </Suspense>

          {items.length === 0 ? (
            <div className="empty">No insights match your search.</div>
          ) : (
            <div className="post-grid">
              {items.map((item) => (
                <article className="post" key={item.slug}>
                  <div className="thumb">
                    {item.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt="" />
                    )}
                  </div>
                  <div className="body">
                    <span className="cat">{labelFor(item.category)}</span>
                    <h2>
                      <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <time dateTime={item.date.toISOString()}>
                      {dateFmt.format(item.date)}
                    </time>
                    <p>{item.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pager" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => {
                const n = i + 1;
                const params = new URLSearchParams();
                params.set("page", String(n));
                if (q) params.set("q", q);
                if (category) params.set("category", category);
                return (
                  <Link
                    key={n}
                    href={`/insights?${params}`}
                    className={n === current ? "active" : undefined}
                    aria-current={n === current ? "page" : undefined}
                  >
                    {n}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
