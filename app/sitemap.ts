import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/lib/getInsights";
import { siteUrl } from "@/lib/site";

// Insights come from the database, so build the list per request, not at deploy time.
export const dynamic = "force-dynamic";

const pages = [
  "",
  "/company",
  "/projects",
  "/sustainability",
  "/careers",
  "/insights",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getPublishedInsights();
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}` })),
    ...insights.map((i) => ({
      url: `${siteUrl}/insights/${i.slug}`,
      lastModified: i.date,
    })),
  ];
}
