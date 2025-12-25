import { prisma } from "@/lib/prisma";

export type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
export type Status = "DRAFT" | "PUBLISHED";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function ensureUniqueSlug({
  desiredSlug,
  excludeId,
}: {
  desiredSlug: string;
  excludeId?: string;
}) {
  let slug = desiredSlug;
  let i = 1;

  while (true) {
    const existing = await prisma.insight.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });

    if (!existing) return slug;
    slug = `${desiredSlug}-${i++}`;
  }
}

export function normalizeCategory(input?: string | null): Category | undefined {
  if (!input) return undefined;

  const map: Record<string, Category> = {
    "press-release": "PRESS_RELEASE",
    press_release: "PRESS_RELEASE",
    blog: "BLOG",
    news: "NEWS",
    update: "UPDATE",
  };

  return map[input.toLowerCase()];
}
