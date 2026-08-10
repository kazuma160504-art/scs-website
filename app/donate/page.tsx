import type { Metadata } from "next";
import { HeartHandshake, Gift, Megaphone } from "lucide-react";
import { PageHeader, Card, SectionTitle, TodoNote } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "支援のお願い",
  description: "SCS への寄付・ご協力のお願い。皆さまのご支援が地域活動を支えています。",
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        emoji="🎁"
        title="支援のお願い"
        lead="SCS の活動は、地域の皆さま・OB OG・企業さまのご支援に支えられています。"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        <FadeIn>
          <section>
            <SectionTitle sub="いただいたご支援は、活動の材料費・移動費・保険料などに大切に使わせていただきます。">
              ご支援の方法
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-6 text-center">
                <Gift className="mx-auto h-8 w-8 text-apricot-500" aria-hidden />
                <h3 className="mt-3 font-black text-ink">寄付</h3>
                <p className="mt-2 text-sm text-ink-light">
                  金銭・物品（レクリエーション用品、文房具など）のご寄付を受け付けています。
                </p>
              </Card>
              <Card className="p-6 text-center">
                <HeartHandshake className="mx-auto h-8 w-8 text-leaf-600" aria-hidden />
                <h3 className="mt-3 font-black text-ink">活動へのご協力</h3>
                <p className="mt-2 text-sm text-ink-light">
                  会場のご提供、サロン開催のご依頼、講師のご紹介など。
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Megaphone className="mx-auto h-8 w-8 text-apricot-500" aria-hidden />
                <h3 className="mt-3 font-black text-ink">広報のご協力</h3>
                <p className="mt-2 text-sm text-ink-light">
                  SNS のフォロー・シェア、活動の口コミも大きな支えになります。
                </p>
              </Card>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <Card className="p-6">
            <h2 className="font-black text-ink">お問い合わせ</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-light">
              ご支援をご検討くださる方は、部長（森一真）
              <a href="mailto:hope_8pa9fs@icloud.com" className="text-leaf-700 underline">
                hope_8pa9fs@icloud.com
              </a>
              までご連絡ください。
            </p>
            <div className="mt-4">
              <TodoNote>
                TODO: 要確認 — 振込先口座・領収書発行の可否など、寄付の受け入れ体制を役員会で決定して追記してください。
              </TodoNote>
            </div>
          </Card>
        </FadeIn>
      </div>
    </>
  );
}
