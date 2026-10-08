import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { slugify, ensureUniqueSlug } from "@/lib/insightsApi";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const insights = await prisma.insight.findMany({
    where: isAdmin ? {} : { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      status: true,
      coverImage: true,
      createdAt: true,
    },
  });

  return NextResponse.json(insights);
}

export async function POST(req: NextRequest) {
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
  const coverImage = body.coverImage ?? null;
  const createdAt = body.createdAt ? new Date(body.createdAt) : undefined;
  if (createdAt && Number.isNaN(createdAt.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (!title || !content) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const desiredSlug = slugify(title);
  const slug = await ensureUniqueSlug({ desiredSlug });

  const insight = await prisma.insight.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      status,
      coverImage,
      ...(createdAt && { createdAt }),
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return NextResponse.json(insight, { status: 201 });
}
