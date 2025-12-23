"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

const mockInsight = {
  id: "1",
  title: "Innocent Resources Advances Exploration Activities in Namibia",
  slug: "innocent-resources-advances-exploration-activities-in-namibia",
  excerpt:
    "The company has expanded its exploration footprint in Namibia, advancing early-stage geological surveys.",
  content:
    "## Exploration Update\n\nInnocent Resources has initiated expanded exploration programs across Namibia.\n\n- Geological mapping\n- Sampling campaigns\n- Early-stage drilling",
  category: "PRESS_RELEASE" as Category,
  status: "PUBLISHED" as Status,
};

const existingSlugs = [
  "innocent-resources-advances-exploration-activities-in-namibia",
  "sustainability-framework-implementation",
  "community-engagement-update",
];

export default function EditInsightPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = useState(mockInsight.title);
  const [slug, setSlug] = useState(mockInsight.slug);
  const [excerpt, setExcerpt] = useState(mockInsight.excerpt);
  const [content, setContent] = useState(mockInsight.content);
  const [category, setCategory] = useState<Category>(mockInsight.category);
  const [status, setStatus] = useState<Status>(mockInsight.status);
  const [loading, setLoading] = useState(false);

  function toSlug(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function generateUniqueSlug(base: string) {
    if (base === mockInsight.slug) return base;

    let unique = base;
    let counter = 2;

    while (
      existingSlugs.includes(unique) &&
      unique !== mockInsight.slug
    ) {
      unique = `${base}-${counter}`;
      counter++;
    }

    return unique;
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    const base = toSlug(value);
    const unique = generateUniqueSlug(base);
    setSlug(unique);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: params.id,
      title,
      slug,
      excerpt,
      content,
      category,
      status,
    };

    console.log("UPDATED INSIGHT:", payload);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/insights");
    }, 800);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Insight</h1>
        <p className="text-sm text-gray-600 mt-1">
          Update existing press release, blog, or news article
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white border border-gray-200 rounded-lg p-8"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(toSlug(e.target.value))}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
          <p className="mt-1 text-xs text-gray-400">
            URL: /insights/{slug}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          >
            <option value="PRESS_RELEASE">Press Release</option>
            <option value="BLOG">Blog</option>
            <option value="NEWS">News</option>
            <option value="UPDATE">Update</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Saving…" : "Update Insight"}
          </button>
        </div>
      </form>
    </main>
  );
}
