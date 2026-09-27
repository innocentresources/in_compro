import { insights as seed } from "./insightData";

export type PublicInsight = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: Date;
  image?: string | null;
  imageCredit?: string | null;
};

export const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "PRESS_RELEASE", label: "Press release" },
  { value: "NEWS", label: "News" },
  { value: "UPDATE", label: "Update" },
  { value: "BLOG", label: "Blog" },
];

/** Bundled entries, used when no database is configured (e.g. local preview). */
function fromSeed(): PublicInsight[] {
  return seed
    .filter((i) => i.status === "PUBLISHED")
    .map((i) => ({
      slug: i.slug,
      title: i.title,
      excerpt: i.excerpt,
      content: i.content,
      category: i.category,
      date: new Date(i.publishedAt),
      image: i.image || null,
      imageCredit: i.imageCredit ?? null,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

async function fromDb(): Promise<PublicInsight[] | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const { prisma } = await import("./prisma");
    const rows = await prisma.insight.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      content: r.content,
      category: r.category,
      date: r.createdAt,
      image: r.coverImage,
    }));
  } catch {
    return null;
  }
}

export async function getPublishedInsights(): Promise<PublicInsight[]> {
  return (await fromDb()) ?? fromSeed();
}

export async function getInsightBySlug(slug: string) {
  const all = await getPublishedInsights();
  return all.find((i) => i.slug === slug) ?? null;
}

export function labelFor(category: string) {
  return (
    CATEGORIES.find((c) => c.value === category)?.label ??
    category.replace("_", " ").toLowerCase()
  );
}
