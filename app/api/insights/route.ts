import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { slugify, ensureUniqueSlug } from "@/lib/insightsApi";

export const dynamic = "force-dynamic";

export async function GET() {
  const insights = await prisma.insight.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      coverImage: true,
      createdAt: true,
    },
  });

  return NextResponse.json(insights);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const title = String(body.title || "").trim();
  const excerpt = String(body.excerpt || "").trim();
  const content = String(body.content || "").trim();
  const category = body.category;
  const status = body.status;
  const coverImage = body.coverImage ? String(body.coverImage).trim() : null;

  if (!title || !content) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const desiredSlug = slugify(title);
  const slug = await ensureUniqueSlug({ desiredSlug });

  const created = await prisma.insight.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      status,
      coverImage,
      authorId: String(session.user.id),
    },
  });

  return NextResponse.json(created, { status: 201 });
}
