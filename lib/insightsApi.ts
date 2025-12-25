import { prisma } from "@/lib/prisma";

export type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
export type Status = "DRAFT" | "PUBLISHED";


export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isNumericIdLike(value: string) {
  return /^[0-9]+$/.test(value);
}


export async function ensureUniqueSlug({
  desiredSlug,
  excludeId,
}: {
  desiredSlug: string;
  excludeId?: string;
}) {
  let slug = desiredSlug;
  let counter = 1;

  while (true) {
    const exists = await prisma.insight.findFirst({
      where: {
        slug,
        ...(excludeId && {
          NOT: { id: excludeId },
        }),
      },
      select: { id: true },
    });

    if (!exists) return slug;

    slug = `${desiredSlug}-${counter++}`;
  }
}


export function normalizeCategory(
  input?: string | null
): Category | undefined {
  if (!input) return undefined;

  const v = input.toLowerCase().trim();

  const map: Record<string, Category> = {
    "press-release": "PRESS_RELEASE",
    press_release: "PRESS_RELEASE",
    pressrelease: "PRESS_RELEASE",
    press: "PRESS_RELEASE",
    blog: "BLOG",
    news: "NEWS",
    update: "UPDATE",
  };

  return map[v];
}
