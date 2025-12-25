"use client";

type Insight = {
  title: string;
  content: string;
  coverImage?: string | null;
};

export default function InsightDetailClient({ data }: { data: Insight }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {data.coverImage && (
        <div className="mb-8 aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-semibold mb-6">
        {data.title}
      </h1>

      <article className="prose max-w-none">
        {data.content}
      </article>
    </main>
  );
}
