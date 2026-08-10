import type { Metadata } from "next";
import { FileDown, MailPlus } from "lucide-react";
import { PageHeader, Card, SectionTitle, TodoNote } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import { CATEGORIES } from "@/lib/categories";
import { Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "地域協力者様へ",
  description:
    "サロン・イベント開催のご依頼を受け付けています。SCS の団体紹介と依頼方法のご案内。",
};

export default function ForPartnersPage() {
  return (
    <>
      <PageHeader
        emoji="🤝"
        title="地域協力者様へ"
        lead="SCS は、地域のサロン・子ども食堂・イベントへの学生派遣のご依頼を受け付けています。いつもお世話になり、ありがとうございます。"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        <FadeIn>
          <section>
            <SectionTitle sub="医学生を中心とした約27名の学生が、次のような活動でお手伝いできます。">
              お手伝いできること
            </SectionTitle>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Badge key={c.key} className={`${c.color} px-4 py-2 text-sm`}>
                  {c.emoji} {c.label}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-light">
              健康体操・脳トレの進行、お茶会のお手伝い、子どもの学習支援・見守り、イベントの運営補助など、
              お気軽にご相談ください。
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section>
            <SectionTitle sub="開催のご依頼・ご相談は下記からお願いします。">
              ご依頼方法
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <MailPlus className="h-8 w-8 text-leaf-600" aria-hidden />
                <h3 className="mt-3 font-black text-ink">依頼フォーム</h3>
                <div className="mt-3">
                  <TodoNote>
                    TODO: 要確認 — サロン依頼受付用の Google Forms を作成し、ここに埋め込んでください。
                    それまでは下記メールでのご連絡をお願いします。
                  </TodoNote>
                </div>
                <p className="mt-3 text-sm text-ink-light">
                  部長（森一真）：
                  <a href="mailto:hope_8pa9fs@icloud.com" className="text-leaf-700 underline">
                    hope_8pa9fs@icloud.com
                  </a>
                </p>
              </Card>
              <Card className="p-6">
                <FileDown className="h-8 w-8 text-apricot-500" aria-hidden />
                <h3 className="mt-3 font-black text-ink">団体紹介 PDF</h3>
                <div className="mt-3">
                  <TodoNote>
                    TODO: 要確認 — 団体紹介 PDF を public/documents/scs-introduction.pdf
                    に置くと、ここからダウンロードできるようになります。
                  </TodoNote>
                </div>
              </Card>
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
