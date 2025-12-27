"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Insight = {
  id: string;
  title: string;
  slug: string;
  category: "PRESS_RELEASE" | "BLOG" | "NEWS" | "UPDATE";
  status: "DRAFT" | "PUBLISHED";
  createdAt: string;
};

export default function InsightsAdminPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insights", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch insights");
        return res.json();
      })
      .then((data) => setInsights(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to permanently delete this insight?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/insights/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }

      // Optimistic UI update
      setInsights((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete insight");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Insights</h1>
          <p className="text-sm text-gray-600">
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

      <div className="rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center">
                  Loading…
                </td>
              </tr>
            )}

            {!loading && insights.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No insights found.
                </td>
              </tr>
            )}

            {insights.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
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
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
