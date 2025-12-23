export type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  image?: string;
};
