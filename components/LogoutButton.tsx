"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm border px-4 py-2 rounded hover:bg-gray-100 transition"
    >
      Logout
    </button>
  );
}
