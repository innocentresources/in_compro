export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[],
  currentSlug?: string
) {
  if (currentSlug && baseSlug === currentSlug) {
    return baseSlug;
  }

  let slug = baseSlug;
  let counter = 2;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
