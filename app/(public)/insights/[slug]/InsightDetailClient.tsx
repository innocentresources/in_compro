"use client";

import { Insight } from "@/lib/insight";

export default function InsightDetailClient({
  data,
}: {
  data: Insight;
}) {
  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
}
