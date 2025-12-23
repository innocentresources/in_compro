import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header / navbar */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
