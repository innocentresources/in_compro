import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ensureUniqueSlug, slugify, Category, Status } from "@/lib/insightsApi";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const admin = isAdmin(session);

  const raw = decodeURIComponent(params.id);

  const insight = await prisma.insight.findFirst({
    where: {
      OR: [{ id: raw }, { slug: raw }],
      ...(admin ? {} : { status: "PUBLISHED" }),
    },
  });

  if (!insight) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(insight);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = decodeURIComponent(params.id);

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const existing = await prisma.insight.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const title = body.title?.trim();
  const excerpt = body.excerpt?.trim();
  const content = body.content?.trim();
  const category = body.category as Category | undefined;
  const status = body.status as Status | undefined;

  let nextSlug: string | undefined;
  if (body.slug || title) {
    nextSlug = await ensureUniqueSlug({
      desiredSlug: slugify(body.slug || title),
      excludeId: id,
    });
  }

  const updated = await prisma.insight.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(excerpt && { excerpt }),
      ...(content && { content }),
      ...(category && { category }),
      ...(status && { status }),
      ...(nextSlug && { slug: nextSlug }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = decodeURIComponent(params.id);

  await prisma.insight.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
