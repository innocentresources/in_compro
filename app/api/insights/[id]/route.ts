import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { slugify, ensureUniqueSlug } from "@/lib/insightsApi";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const insight = await prisma.insight.findUnique({ where: { id } });
  if (!insight) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(insight);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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

    if (!title || !content) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const existing = await prisma.insight.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let slug = existing.slug;
    if (existing.title !== title) {
      const desiredSlug = slugify(title);
      slug = await ensureUniqueSlug({ desiredSlug, excludeId: id });
    }

    const updated = await prisma.insight.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        status,
        coverImage,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT /api/insights/[id] ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { del } from "@vercel/blob";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const insight = await prisma.insight.findUnique({ where: { id } });
    if (!insight) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (insight.coverImage) {
      try {
        await del(insight.coverImage);
      } catch (blobError) {
        console.warn("Failed to delete blob:", blobError);
      }
    }

    await prisma.insight.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/insights/[id] ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
