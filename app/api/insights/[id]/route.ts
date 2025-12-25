import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import {
  ensureUniqueSlug,
  slugify,
  isNumericIdLike,
  type Category,
  type Status,
} from "@/lib/insightsApi";

export const dynamic = "force-dynamic";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

/* ===================== GET ===================== */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  const admin = isAdmin(session);

  const where = isNumericIdLike(id)
    ? { id }
    : { slug: id };

  const insight = await prisma.insight.findFirst({
    where: admin ? where : { ...where, status: "PUBLISHED" },
  });

  if (!insight) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(insight);
}

/* ===================== PUT ===================== */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const title = body.title?.trim();
  const excerpt = body.excerpt?.trim();
  const content = body.content?.trim();
  const category = body.category as Category | undefined;
  const status = body.status as Status | undefined;

  let slug: string | undefined;

  if (body.slug || title) {
    slug = await ensureUniqueSlug({
      desiredSlug: slugify(body.slug || title),
      excludeId: id,
    });
  }

  const updated = await prisma.insight.update({
    where: isNumericIdLike(id) ? { id } : { slug: id },
    data: {
      ...(title && { title }),
      ...(excerpt && { excerpt }),
      ...(content && { content }),
      ...(category && { category }),
      ...(status && { status }),
      ...(slug && { slug }),
      ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
    },
  });

  return NextResponse.json(updated);
}

/* ===================== DELETE ===================== */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.insight.delete({
    where: isNumericIdLike(id) ? { id } : { slug: id },
  });

  return NextResponse.json({ ok: true });
}
