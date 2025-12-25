"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

type Insight = {
  id: string;
  title: string;
  slug: string;
  category: Category;
  status: Status;
  createdAt: string;
};

export default function InsightsAdminPage() {
  const [items, setItems] = useState<Insight[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"ALL" | Category>("ALL");
  const [status, setStatus] = useState<"ALL" | Status>("ALL");

  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const query = useMemo(() => {
    const q = new URLSearchParams();
    q.set("page", String(page));
    q.set("limit", "10");

    if (search) q.set("search", search);
    if (category !== "ALL") q.set("category", category);
    if (status !== "ALL") q.set("status", status);

    return q.toString();
  }, [page, search, category, status]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/insights?${query}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items || []);
        setTotalPages(d.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [query]);

  async function handleDelete() {
    if (!deleteId) return;

    await fetch(`/api/insights/${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    setItems((prev) => prev.filter((i) => i.id !== deleteId));
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage press releases, blogs, and news
          </p>
        </div>

        <Link
          href="/admin/insights/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          New Insight
        </Link>
      </header>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="rounded-md border px-3 py-2 text-sm"
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value as any);
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="ALL">All Categories</option>
          <option value="PRESS_RELEASE">Press Release</option>
          <option value="BLOG">Blog</option>
          <option value="NEWS">News</option>
          <option value="UPDATE">Update</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as any);
          }}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="ALL">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-400">
                      /insights/{item.slug}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {item.category.replace("_", " ")}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium ${
                        item.status === "PUBLISHED"
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right space-x-3">
                    <Link
                      href={`/admin/insights/${item.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No insights found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              page === i + 1
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold">Delete Insight</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this insight?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
