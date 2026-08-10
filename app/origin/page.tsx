import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPage } from "@/lib/content";
import { PageHeader, TodoNote, Card } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import organization from "@/data/organization.json";

export const metadata: Metadata = {
  title: "活動の原点",
  description: "SCS 設立の経緯と、なぜこの活動を始めたのかのストーリー。",
};

export default function OriginPage() {
  const page = getPage("origin");

  return (
    <>
      <PageHeader
        emoji="🌱"
        title="活動の原点"
        lead="2022年の設立から今日まで。なぜ医学生が地域に飛び込むのか、その原点を紹介します。"
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <FadeIn>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <p className="text-sm font-bold text-ink-light">結成</p>
              <p className="mt-1 text-xl font-black text-ink">2022年</p>
              <p className="mt-1 text-xs text-apricot-600">TODO: 要確認 — 正確な結成年月日</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-bold text-ink-light">顧問教員</p>
              <p className="mt-1 text-xl font-black text-ink">{organization.advisor.name} 先生</p>
              <p className="mt-1 text-xs text-ink-light">{organization.advisor.affiliation}</p>
            </Card>
          </div>
          <TodoNote>
            このページの本文は content/pages/origin.mdx を編集すると更新できます（設立ストーリーは仮置きです。創設メンバーへの聞き取りをもとに加筆してください）。
          </TodoNote>
          {page && (
            <article className="mdx-body mt-8">
              <MDXRemote source={page.content} />
            </article>
          )}
        </FadeIn>
      </div>
    </>
  );
}
