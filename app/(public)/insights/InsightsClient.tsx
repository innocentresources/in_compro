"use client";

import Link from "next/link";
import { Insight } from "@/lib/insight";

export default function InsightsClient({
  data,
}: {
  data: Insight[];
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((item) => (
        <article key={item.id}>
          <Link href={`/insights/${item.slug}`}>
            <h3>{item.title}</h3>
          </Link>
          <p>{item.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
