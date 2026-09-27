"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/getInsights";

export default function InsightsFilter() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [category, setCategory] = useState(sp.get("category") || "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    router.push(`/insights${params.size ? `?${params}` : ""}`);
  }

  return (
    <form className="filters" onSubmit={apply} role="search">
      <input
        className="field grow"
        type="search"
        placeholder="Search insights"
        aria-label="Search insights"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <select
        className="field"
        aria-label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <button className="btn outline" type="submit">
        Filter
      </button>
    </form>
  );
}
