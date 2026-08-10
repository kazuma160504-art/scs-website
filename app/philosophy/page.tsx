import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPage } from "@/lib/content";
import { PageHeader, TodoNote } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "理念",
  description: "SCS（佐賀大学医学部学生地域交流の会）の理念・ミッション・ビジョン。",
};

export default function PhilosophyPage() {
  const page = getPage("philosophy");

  return (
    <>
      <PageHeader
        emoji="💚"
        title="理念"
        lead="SCS が大切にしている想いと、団体名に込めた意味を紹介します。"
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <FadeIn>
          <TodoNote>
            このページの本文は content/pages/philosophy.mdx を編集すると更新できます（現在は仮置きテキストです）。
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
