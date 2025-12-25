import InsightsClient from "./InsightsClient";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string; category?: string };
}) {
  const page = Number(searchParams?.page ?? 1);
  const category = searchParams?.category ?? "";

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/insights?page=${page}&category=${category}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  return <InsightsClient data={json.items} />;
}
