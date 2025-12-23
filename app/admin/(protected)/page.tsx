import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Administration
          </span>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Signed in as <span className="font-medium">{session?.user?.email}</span>
          </p>
        </div>

        <LogoutButton />
      </header>

      {/* Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Insights CMS */}
        <Link
          href="/admin/insights"
          className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Insights Management
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            Create, edit, and publish news, press releases, and corporate insights.
          </p>

          <div className="mt-6 text-sm font-medium text-gray-900 group-hover:underline">
            Manage Insights →
          </div>
        </Link>

        {/* Placeholder */}
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-medium text-gray-400 mb-2">
            Additional Modules
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Future administrative tools and content modules will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}
