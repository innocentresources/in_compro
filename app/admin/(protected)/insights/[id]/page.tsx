"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

export default function EditInsightPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("PRESS_RELEASE");
  const [status, setStatus] = useState<Status>("DRAFT");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function slugify(v: string) {
    return v
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  useEffect(() => {
    fetch(`/api/insights/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setTitle(d.title);
        setSlug(d.slug);
        setExcerpt(d.excerpt || "");
        setContent(d.content || "");
        setCategory(d.category);
        setStatus(d.status);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch(`/api/insights/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        content,
        category,
        status,
      }),
    });

    if (!res.ok) {
      const j = await res.json();
      setError(j.error || "Failed to update insight");
      setSaving(false);
      return;
    }

    router.push("/admin/insights");
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading…</div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Edit Insight</h1>

      {error && (
        <div className="mb-4 rounded bg-red-50 text-red-700 px-4 py-2 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border rounded-lg p-8">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(slugify(e.target.value));
            }}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            className="w-full border rounded px-3 py-2 text-sm bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="PRESS_RELEASE">Press Release</option>
            <option value="BLOG">Blog</option>
            <option value="NEWS">News</option>
            <option value="UPDATE">Update</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full border rounded px-3 py-2 text-sm font-mono"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 text-sm rounded bg-gray-900 text-white"
          >
            {saving ? "Saving…" : "Update Insight"}
          </button>
        </div>
      </form>
    </main>
  );
}
