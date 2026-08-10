import type { Metadata } from "next";
import Link from "next/link";
import { Car, FolderOpen, Phone } from "lucide-react";
import { PageHeader, Card, SectionTitle, TodoNote, Button } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import { PrepChecklists } from "@/components/prep-checklist";
import checklists from "@/data/checklists.json";

export const metadata: Metadata = {
  title: "活動準備物・流れ",
  description: "SCS の活動別準備物チェックリスト、当日の流れ、移動手段、資料の格納先。",
};

export default function OperationsPage() {
  return (
    <>
      <PageHeader
        emoji="🎒"
        title="活動準備物・流れ"
        lead="活動前はここをチェック！準備物リストと当日の流れ、移動手段をまとめています。"
      />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-12">
        <FadeIn>
          <section aria-labelledby="prep-heading">
            <SectionTitle sub="活動名を押すと準備物チェックリストと当日フローが開きます。">
              <span id="prep-heading">✅ 活動別 準備物・当日の流れ</span>
            </SectionTitle>
            <PrepChecklists checklists={checklists} />
          </section>
        </FadeIn>

        <FadeIn>
          <section aria-labelledby="transport-heading">
            <SectionTitle sub="遠方の活動は車で移動します。免許を持っている部員は運転協力をお願いします。">
              <span id="transport-heading" className="inline-flex items-center gap-2">
                <Car className="h-6 w-6 text-leaf-600" aria-hidden /> 移動手段
              </span>
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-5">
                <h3 className="font-black text-ink">集合場所</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-light">
                  基本は<strong className="text-ink">医大ファミマ前</strong>に集合し、乗り合わせて移動します。
                  活動ごとの集合時刻は部内 LINE で連絡します。
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="font-black text-ink">レンタカー予約</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-light">
                  大人数での移動時はレンタカーを利用します。
                </p>
                <div className="mt-3">
                  <TodoNote>
                    TODO: 要確認 — 利用するレンタカー会社・予約手順・費用精算のルールを追記してください。
                  </TodoNote>
                </div>
              </Card>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section aria-labelledby="drive-heading">
            <SectionTitle sub="活動写真・議事録・各種資料は Google Drive に格納しています。">
              <span id="drive-heading" className="inline-flex items-center gap-2">
                <FolderOpen className="h-6 w-6 text-apricot-500" aria-hidden /> 資料の格納先
              </span>
            </SectionTitle>
            <Card className="p-6">
              <TodoNote>
                TODO: 要確認 — Google Drive の共有 URL が確定したら、components/footer.tsx の SNS.drive
                とこのセクションにリンクを設定してください。
              </TodoNote>
            </Card>
          </section>
        </FadeIn>

        <FadeIn>
          <section aria-labelledby="contacts-link-heading">
            <SectionTitle sub="役員・グループ責任者・地域交流先の連絡先は専用ページにまとめています。">
              <span id="contacts-link-heading" className="inline-flex items-center gap-2">
                <Phone className="h-6 w-6 text-leaf-600" aria-hidden /> 連絡先一覧
              </span>
            </SectionTitle>
            <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
              <p className="text-sm text-ink-light">
                個人情報保護のため、連絡先一覧は部内共有の合言葉付きページにあります。
              </p>
              <Button href="/contacts">連絡先一覧を開く</Button>
            </Card>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
