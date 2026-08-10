import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getActivities, getActivity } from "@/lib/content";
import { categoryMap } from "@/lib/categories";
import { formatDateJa } from "@/lib/utils";
import { Badge } from "@/components/ui";

export function generateStaticParams() {
  return getActivities().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const activity = getActivity(params.slug);
  if (!activity) return {};
  return { title: activity.title, description: activity.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const activity = getActivity(params.slug);
  if (!activity) notFound();
  const cat = categoryMap[activity.category];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-bold text-leaf-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> 活動ブログ一覧へ
      </Link>
      <header className="mt-6 border-b border-cream-200 pb-6">
        <p className="text-sm text-ink-light">{formatDateJa(activity.date)}</p>
        <h1 className="mt-2 text-3xl font-black text-ink">
          {activity.emoji && <span className="mr-2">{activity.emoji}</span>}
          {activity.title}
        </h1>
        <div className="mt-3">
          <Badge className={cat.color}>
            {cat.emoji} {cat.label}
          </Badge>
        </div>
      </header>
      <div className="mdx-body mt-6">
        <MDXRemote source={activity.content} />
      </div>
    </article>
  );
}
