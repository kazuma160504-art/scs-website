import type { Metadata } from "next";
import { Award, Trophy } from "lucide-react";
import { getActivities } from "@/lib/content";
import { formatDateJa } from "@/lib/utils";
import { PageHeader, Card, SectionTitle } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import { CategoryTabs } from "@/components/category-tabs";
import { ActivityTimeline } from "@/components/activity-timeline";
import { PhotoGallery } from "@/components/photo-gallery";
import awards from "@/data/awards.json";

export const metadata: Metadata = {
  title: "活動実績・内容",
  description:
    "SCS の活動実績。高齢者サロン・子ども支援・ダウン症児支援・地域交流・学外イベント、年間約60件の活動記録と表彰歴。",
};

export default function ActivitiesPage() {
  const activities = getActivities();
  const meta = activities.map(({ content, ...m }) => m);

  return (
    <>
      <PageHeader
        emoji="📖"
        title="活動実績・内容"
        lead="2025年度は年間約60件の活動を実施しました（高齢者サロン 約25回／子ども支援 約20回／ダウン症児支援 約5回／地域交流・学外イベント 約10回）。"
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        {/* 表彰歴・助成金 */}
        <FadeIn>
          <section aria-labelledby="awards-heading">
            <SectionTitle sub="活動へのご評価・ご支援に心より感謝申し上げます。">
              <span id="awards-heading">🏆 表彰歴・助成金</span>
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2">
              {awards.map((a) => (
                <Card key={a.title} className="flex gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-apricot-100 text-apricot-600">
                    {a.type === "表彰" ? (
                      <Trophy className="h-6 w-6" aria-hidden />
                    ) : (
                      <Award className="h-6 w-6" aria-hidden />
                    )}
                  </span>
                  <div>
                    <p className="text-xs text-ink-light">
                      {a.date ? formatDateJa(a.date) : "時期未確認"} ・ {a.type}
                    </p>
                    <h3 className="font-black text-ink">{a.title}</h3>
                    <p className="mt-1 text-sm font-bold text-apricot-600">{a.amount}</p>
                    <p className="mt-1 text-sm text-ink-light">{a.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* カテゴリ別紹介 */}
        <FadeIn>
          <section aria-labelledby="categories-heading">
            <SectionTitle sub="5つのカテゴリで地域と関わっています。タブで切り替えてご覧ください。">
              <span id="categories-heading">🗂 活動カテゴリ</span>
            </SectionTitle>
            <CategoryTabs />
          </section>
        </FadeIn>

        {/* タイムライン */}
        <FadeIn>
          <section aria-labelledby="timeline-heading">
            <SectionTitle sub="カテゴリ・年度で絞り込めます。タイトルを押すと活動レポートが開きます。">
              <span id="timeline-heading">🕐 活動履歴タイムライン</span>
            </SectionTitle>
            <ActivityTimeline activities={meta} />
          </section>
        </FadeIn>

        {/* 写真ギャラリー */}
        <FadeIn>
          <section aria-labelledby="gallery-heading">
            <SectionTitle sub="カテゴリで絞り込めます。写真の追加方法は CONTRIBUTING.md を参照してください。">
              <span id="gallery-heading">📷 写真ギャラリー</span>
            </SectionTitle>
            <PhotoGallery />
          </section>
        </FadeIn>
      </div>
    </>
  );
}
