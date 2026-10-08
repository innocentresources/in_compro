"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

type Insight = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  status: Status;
  coverImage: string | null;
  createdAt: string;
};

export default function EditInsightPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<Insight | null>(null);

  useEffect(() => {
    (async () => {
      setError("");
      setLoading(true);

      try {
        const res = await fetch(`/api/insights/${params.id}`, { cache: "no-store" });
        const json = await res.json().catch(() => null);

        if (!res.ok) {
          setError(json?.error || "Failed to load insight");
          setData(null);
          return;
        }

        setData(json);
      } catch {
        setError("Failed to load insight");
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  async function handleUpload(file: File) {
    setError("");
    setUploading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setError(json?.error || "Upload failed");
        return;
      }

      setData((prev) => (prev ? { ...prev, coverImage: json.url } : prev));
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;

    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/insights/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          status: data.status,
          coverImage: data.coverImage,
          createdAt: data.createdAt,
        }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setError(json?.error || "Failed to update insight");
        return;
      }

      router.push("/admin/insights");
    } catch {
      setError("Failed to update insight");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-sm text-gray-600">Loading…</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-sm text-red-700">{error || "Not found"}</div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Insight</h1>
        <p className="text-sm text-gray-600 mt-1">Update existing post</p>
      </header>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white border border-gray-200 rounded-lg p-8"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            value={data.slug}
            onChange={(e) => setData({ ...data, slug: e.target.value })}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value as Category })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
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
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value as Status })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Publish date</label>
          <input
            type="date"
            value={data.createdAt.slice(0, 10)}
            onChange={(e) => setData({ ...data, createdAt: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            value={data.excerpt}
            onChange={(e) => setData({ ...data, excerpt: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            rows={10}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900/10"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
            className="block w-full text-sm"
          />

          <div className="text-xs text-gray-500">
            {uploading ? "Uploading..." : data.coverImage ? "Current ✅" : "No image yet"}
          </div>

          {data.coverImage && (
            <img
              src={data.coverImage}
              alt="Cover preview"
              className="w-full max-h-64 object-cover rounded-lg border"
            />
          )}
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
            disabled={saving || uploading}
            className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Update Insight"}
          </button>
        </div>
      </form>
    </main>
  );
}
