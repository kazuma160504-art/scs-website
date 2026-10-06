import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Sprout,
  CalendarDays,
  ClipboardList,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { getActivities } from "@/lib/content";
import { categoryMap } from "@/lib/categories";
import { formatDateJa } from "@/lib/utils";
import { Badge, Button, Card, SectionTitle } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";
import { InstagramEmbed } from "@/components/instagram-embed";

const SECTIONS = [
  {
    href: "/philosophy",
    icon: Heart,
    title: "理念",
    text: "SCS が大切にしている想いと、団体名に込めた意味。",
  },
  {
    href: "/origin",
    icon: Sprout,
    title: "活動の原点",
    text: "2022年の設立から今日まで。なぜこの活動を始めたのか。",
  },
  {
    href: "/activities",
    icon: BookOpen,
    title: "活動実績・内容",
    text: "高齢者サロン・子ども支援など、年間約60件の活動記録。",
  },
  {
    href: "/plans",
    icon: CalendarDays,
    title: "今後の活動",
    text: "2026年度の活動計画とカレンダー。参加申込はこちらから。",
  },
  {
    href: "/operations",
    icon: ClipboardList,
    title: "活動準備・連絡先",
    text: "準備物チェックリスト、当日の流れ、移動手段、連絡先一覧。",
  },
];

export default function HomePage() {
  const latest = getActivities().slice(0, 3);

  return (
    <>
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-gradient-to-b from-leaf-50 via-cream-50 to-cream-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
          <FadeIn>
            <p className="mb-3 inline-block rounded-full bg-apricot-100 px-4 py-1 text-sm font-bold text-apricot-700">
              佐賀大学医学部 学生ボランティア団体
            </p>
            <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">
              地域とともに、
              <br />
              <span className="text-leaf-600">学び、支え合う。</span>
            </h1>
            <p className="mt-4 text-lg font-bold text-ink">
              SCS — Saga medical Community Support
            </p>
            <p className="mt-2 max-w-xl leading-relaxed text-ink-light">
              高齢者サロン、子どもの居場所づくり、ダウン症児支援。
              医学生が地域に飛び込み、人と人とのつながりの中で学ばせていただいています。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/activities">活動を見る</Button>
              <Button href="/plans" variant="outline">
                参加する
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Image
              src="/images/banners/hero.jpg"
              alt="城北団地サロンで、学生が参加者の皆さんと一緒に健康体操をしている様子"
              width={1600}
              height={1200}
              priority
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            />
          </FadeIn>
        </div>
      </section>

      {/* 5つのセクション誘導カード */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle sub="このサイトは SCS のポータルです。目的に合わせてお進みください。">
          SCS を知る・使う
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s, i) => (
            <FadeIn key={s.href} delay={i * 0.05}>
              <Link href={s.href} className="group block h-full">
                <Card className="h-full p-6 transition-shadow group-hover:shadow-md">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                    <s.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="flex items-center gap-1 text-lg font-black text-ink group-hover:text-leaf-700">
                    {s.title}
                    <ArrowRight
                      className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-light">{s.text}</p>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 直近の活動ハイライト */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle sub="最近の活動レポートをピックアップ。すべての記録は活動ブログへ。">
            活動ハイライト
          </SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((a, i) => {
              const cat = categoryMap[a.category];
              return (
                <FadeIn key={a.slug} delay={i * 0.05}>
                  <Link href={`/blog/${a.slug}`} className="group block h-full">
                    <Card className="flex h-full flex-col p-6 transition-shadow group-hover:shadow-md">
                      <p className="text-4xl">{a.emoji ?? cat.emoji}</p>
                      <p className="mt-3 text-xs text-ink-light">{formatDateJa(a.date)}</p>
                      <h3 className="mt-1 font-black text-ink group-hover:text-leaf-700">
                        {a.title}
                      </h3>
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
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
            <div className="flex items-center">
              <Button href="/blog" variant="outline">
                活動ブログをすべて見る <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
            <InstagramEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
