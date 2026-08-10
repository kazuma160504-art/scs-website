import type { Metadata } from "next";
import { PageHeader, Card } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "SCS への入部方法・活動頻度など、新入部員向けのよくある質問。",
};

const FAQS = [
  {
    q: "入部するにはどうすればいいですか？",
    a: "部長（森一真）または部員に声をかけてください。見学からで大丈夫です。医学部以外（薬学部・理工学部など）の学生も歓迎しています。入部届などの手続きは声をかけていただいた際にご案内します。",
  },
  {
    q: "活動頻度はどのくらいですか？",
    a: "定例活動は毎週水曜の greenbook 学習支援と、月1回ペースの各サロン・カフェです。すべてに参加する必要はなく、自分の都合の良い活動だけ参加すればOKです。テスト期間はお休みする部員も多いです。",
  },
  {
    q: "単位認定はありますか？",
    a: "TODO: 要確認 — 単位認定・ボランティア証明の扱いについては顧問の市場先生・学生課に確認のうえ追記してください。",
  },
  {
    q: "医療の知識がなくても参加できますか？",
    a: "もちろんです。活動の中心は健康体操やレクリエーション、子どもと遊ぶことなので、特別な知識は必要ありません。地域の方と話すこと自体が医療者としての大切な学びになります。",
  },
  {
    q: "車がなくても参加できますか？",
    a: "はい。基本は医大ファミマ前に集合して乗り合わせで移動するので、車がなくても参加できます。",
  },
  {
    q: "費用はかかりますか？",
    a: "TODO: 要確認 — 部費の有無・金額を確認して追記してください。",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        emoji="❓"
        title="よくある質問"
        lead="新入部員・入部を検討中の方からよくいただく質問をまとめました。"
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
        {FAQS.map((f, i) => (
          <FadeIn key={i} delay={Math.min(i, 4) * 0.04}>
            <Card className="p-6">
              <h2 className="flex gap-2 font-black text-ink">
                <span className="text-leaf-600" aria-hidden>
                  Q.
                </span>
                {f.q}
              </h2>
              <p className="mt-3 flex gap-2 text-sm leading-relaxed text-ink-light">
                <span className="font-black text-apricot-500" aria-hidden>
                  A.
                </span>
                <span className={f.a.startsWith("TODO") ? "text-apricot-600" : ""}>{f.a}</span>
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
