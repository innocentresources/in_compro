"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Category = "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
type Status = "DRAFT" | "PUBLISHED";

type Insight = {
  id: string;
  title: string;
  slug: string;
  category: Category;
  status: Status;
  publishedAt: string;
};

const initialInsights: Insight[] = [
  {
    id: "1",
    title: "Innocent Resources Advances Exploration Activities in Namibia",
    slug: "innocent-resources-advances-exploration-activities-in-namibia",
    category: "PRESS_RELEASE",
    status: "PUBLISHED",
    publishedAt: "2025-01-10",
  },
  {
    id: "2",
    title: "Sustainability Framework Implementation",
    slug: "sustainability-framework-implementation",
    category: "BLOG",
    status: "DRAFT",
    publishedAt: "2025-01-05",
  },
  {
    id: "3",
    title: "Community Engagement Update",
    slug: "community-engagement-update",
    category: "NEWS",
    status: "PUBLISHED",
    publishedAt: "2025-01-02",
  },
];

export default function InsightsAdminPage() {
  const [insights, setInsights] = useState(initialInsights);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"ALL" | Category>("ALL");
  const [status, setStatus] = useState<"ALL" | Status>("ALL");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "ALL" || item.category === category;

      const matchStatus =
        status === "ALL" || item.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [insights, search, category, status]);

  function handleDelete() {
    if (!deleteId) return;
    setInsights((prev) =>
      prev.filter((item) => item.id !== deleteId)
    );
    setDeleteId(null);
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
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          New Insight
        </Link>
      </header>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900/10"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="ALL">All Categories</option>
          <option value="PRESS_RELEASE">Press Release</option>
          <option value="BLOG">Blog</option>
          <option value="NEWS">News</option>
          <option value="UPDATE">Update</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value="ALL">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInsights.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {item.title}
                  </div>
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
                  {new Date(item.publishedAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right space-x-3">
                  <Link
                    href={`/admin/insights/${item.id}`}
                    className="text-sm font-medium text-gray-900 hover:underline"
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

            {filteredInsights.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No insights match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold">
              Delete Insight
            </h2>

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
