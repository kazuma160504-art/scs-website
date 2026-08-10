import type { Metadata } from "next";
import Link from "next/link";
import { getActivities } from "@/lib/content";
import { categoryMap } from "@/lib/categories";
import { formatDateJa } from "@/lib/utils";
import { PageHeader, Card, Badge } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "活動ブログ",
  description: "SCS の活動レポート一覧。日々の活動の様子を写真と文章でお届けします。",
};

export default function BlogPage() {
  const activities = getActivities();

  return (
    <>
      <PageHeader
        emoji="✍️"
        title="活動ブログ"
        lead="日々の活動レポートです。新しい記事は content/activities に MDX ファイルを追加すると掲載されます。"
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, i) => {
            const cat = categoryMap[a.category];
            return (
              <FadeIn key={a.slug} delay={Math.min(i, 5) * 0.04}>
                <Link href={`/blog/${a.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col p-6 transition-shadow group-hover:shadow-md">
                    <p className="text-4xl">{a.emoji ?? cat.emoji}</p>
                    <p className="mt-3 text-xs text-ink-light">{formatDateJa(a.date)}</p>
                    <h2 className="mt-1 font-black text-ink group-hover:text-leaf-700">{a.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink-light">{a.excerpt}</p>
                    <Badge className={`${cat.color} mt-4 self-start`}>
                      {cat.emoji} {cat.label}
                    </Badge>
                  </Card>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </>
  );
}
