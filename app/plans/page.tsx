import type { Metadata } from "next";
import { CalendarDays, Repeat, Sparkles } from "lucide-react";
import { PageHeader, Card, SectionTitle, TodoNote, Badge } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import { EventCalendar, type EventsData } from "@/components/event-calendar";
import { categoryMap, type CategoryKey } from "@/lib/categories";
import { formatDateJa } from "@/lib/utils";
import eventsJson from "@/data/events.json";

export const metadata: Metadata = {
  title: "今後の活動",
  description: "SCS の2026年度活動計画。定例活動・予定イベント・カレンダー・参加申込。",
};

const RULE_LABEL: Record<string, (r: any) => string> = {
  weekly: (r) => `毎週${["日", "月", "火", "水", "木", "金", "土"][r.weekday]}曜`,
  "monthly-weekday": (r) =>
    `毎月第${r.week}${["日", "月", "火", "水", "木", "金", "土"][r.weekday]}曜`,
  "monthly-tbd": () => "毎月（開催日調整中）",
};

export default function PlansPage() {
  const events = eventsJson as EventsData;

  return (
    <>
      <PageHeader
        emoji="🗓"
        title="今後の活動"
        lead={`${events.fiscalYear}の活動計画です。定例活動は毎月継続して開催しています。見学・参加はいつでも歓迎です！`}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12">
        {/* 定例活動 */}
        <FadeIn>
          <section aria-labelledby="regular-heading">
            <SectionTitle sub="毎週・毎月の固定活動です。初参加の方は部長までご連絡ください。">
              <span id="regular-heading" className="inline-flex items-center gap-2">
                <Repeat className="h-6 w-6 text-leaf-600" aria-hidden /> 定例活動
              </span>
            </SectionTitle>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.regular.map((e) => {
                const cat = categoryMap[e.category as CategoryKey];
                return (
                  <Card key={e.id} className="p-5">
                    <p className="text-3xl">{e.emoji}</p>
                    <h3 className="mt-2 font-black text-ink">{e.title}</h3>
                    <p className="mt-1 text-sm font-bold text-leaf-700">
                      {RULE_LABEL[e.rule.type](e.rule)} {e.time}
                    </p>
                    <p className="text-sm text-ink-light">{e.location}</p>
                    {e.note && <p className="mt-2 text-xs text-apricot-600">{e.note}</p>}
                    <Badge className={`${cat.color} mt-3`}>
                      {cat.emoji} {cat.label}
                    </Badge>
                  </Card>
                );
              })}
            </div>
          </section>
        </FadeIn>

        {/* 予定イベント */}
        <FadeIn>
          <section aria-labelledby="special-heading">
            <SectionTitle sub="単発・新規のイベントです。決定次第 data/events.json に追加されます。">
              <span id="special-heading" className="inline-flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-apricot-500" aria-hidden /> 予定イベント
              </span>
            </SectionTitle>
            <div className="space-y-3">
              {events.special.map((e) => (
                <Card key={e.title} className="flex flex-wrap items-center gap-4 p-5">
                  <p className="text-3xl">{e.emoji}</p>
                  <div className="flex-1">
                    <p className="text-sm text-ink-light">{formatDateJa(e.date)}</p>
                    <h3 className="font-black text-ink">{e.title}</h3>
                    <p className="text-sm text-ink-light">
                      {e.time} ・ {e.location}
                    </p>
                    {e.note && <p className="mt-1 text-xs text-apricot-600">{e.note}</p>}
                  </div>
                </Card>
              ))}
              <TodoNote>その他のイベントは決定次第追加します。</TodoNote>
            </div>
          </section>
        </FadeIn>

        {/* カレンダー */}
        <FadeIn>
          <section aria-labelledby="calendar-heading">
            <SectionTitle sub="月・週・リスト表示を切り替えられます。">
              <span id="calendar-heading" className="inline-flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-leaf-600" aria-hidden /> 活動カレンダー
              </span>
            </SectionTitle>
            <EventCalendar data={events} />
          </section>
        </FadeIn>

        {/* 参加申込 */}
        <FadeIn>
          <section aria-labelledby="join-heading">
            <SectionTitle sub="活動への参加・見学の申し込みはこちらから。">
              <span id="join-heading">✋ 参加申込</span>
            </SectionTitle>
            <Card className="p-6">
              <TodoNote>
                Google Forms の申込フォーム URL が確定したら、app/plans/page.tsx のこのセクションに iframe
                で埋め込んでください（例：&lt;iframe src=&quot;https://docs.google.com/forms/d/e/…/viewform?embedded=true&quot; …&gt;）。
                それまでは部長（森一真）まで直接ご連絡ください。
              </TodoNote>
            </Card>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
