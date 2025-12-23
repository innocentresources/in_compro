"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateUniqueSlug } from "@/lib/slug";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

const existingSlugs = [
  "innocent-resources-advances-exploration-activities-in-namibia",
  "sustainability-framework-implementation",
];

export default function NewInsightPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("PRESS_RELEASE");
  const [status, setStatus] = useState<Status>("DRAFT");
  const [loading, setLoading] = useState(false);

  function toSlug(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    const base = toSlug(value);
    const unique = generateUniqueSlug(base, existingSlugs);
    setSlug(unique);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      status,
    };

    console.log("NEW INSIGHT:", payload);

    setTimeout(() => {
      setLoading(false);
      router.push("/admin/insights");
    }, 800);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">New Insight</h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white border rounded-lg p-8"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Slug
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full border rounded px-3 py-2"
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
            className="w-full border rounded px-3 py-2"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-5 py-2 rounded"
        >
          {loading ? "Saving…" : "Save Insight"}
        </button>
      </form>
    </main>
  );
}
