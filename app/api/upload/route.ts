import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { slugify } from "@/lib/insightsApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "Max 5MB" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
      ? "webp"
      : "jpg";

  const baseName =
    slugify(file.name.replace(/\.[^/.]+$/, "")) || crypto.randomUUID();

  const blob = await put(
    `insights/${baseName}.${ext}`,
    file,
    {
      access: "public",
      addRandomSuffix: true,
    }
  );

  return NextResponse.json(
    {
      url: blob.url,
    },
    { status: 201 }
  );
}
