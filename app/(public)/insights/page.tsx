import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

const PAGE_SIZE = 6;

function humanizeCategory(cat: string) {
  return cat.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export function generateMetadata({
  searchParams,
}: {
  searchParams?: { category?: string };
}): Metadata {
  const category = searchParams?.category;

  return {
    title: category
      ? `${humanizeCategory(category)} | Insights`
      : "Insights | Innocent Resources",
    description:
      "Latest press releases, news, and insights from Innocent Resources Corporation Limited.",
  };
}

export default function InsightsPage({
  searchParams,
}: {
  searchParams?: { category?: string; page?: string };
}) {
  const page = Math.max(1, Number(searchParams?.page ?? 1) || 1);
  const category = searchParams?.category ?? null;

  return <InsightsClient page={page} pageSize={PAGE_SIZE} category={category} />;
}
