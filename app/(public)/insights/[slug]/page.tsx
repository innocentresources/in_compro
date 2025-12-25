import InsightDetailClient from "./InsightDetailClient";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/insights/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch insight");
  }

  const data = await res.json();

  return <InsightDetailClient data={data} />;
}
