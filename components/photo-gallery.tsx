"use client";

import { useState } from "react";
import Image from "next/image";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface Photo {
  src: string;
  alt: string;
  caption: string;
  category: CategoryKey;
}

// 写真を追加するときはこの配列に1件追加し、public/images/activities/ に画像を置く
const PHOTOS: Photo[] = [
  { src: "/images/activities/johoku-taiso.jpg", alt: "城北団地サロンで健康体操をリードする学生たち", caption: "城北団地サロン 健康体操", category: "senior" },
  { src: "/images/activities/johoku-fureai.jpg", alt: "サロンで参加者の方と談笑する学生", caption: "サロンでのふれあい", category: "senior" },
  { src: "/images/activities/johoku-salon.jpg", alt: "城北団地サロンの会場の様子", caption: "城北団地サロン", category: "senior" },
  { src: "/images/activities/salon-taiso-wide.jpg", alt: "サロンで体操をする参加者と学生の全景", caption: "みんなで健康体操", category: "senior" },
  { src: "/images/activities/ongaku-koryu.jpg", alt: "バイオリンを持つ学生と参加者の方", caption: "音楽でのふれあい", category: "senior" },
  { src: "/images/activities/balloon-art-1.jpg", alt: "バルーンアートで作ったお花", caption: "サンドカフェ バルーンアート", category: "kids" },
  { src: "/images/activities/balloon-art-2.jpg", alt: "バルーンアートを作る学生たち", caption: "サンドカフェ（本庄公民館）", category: "kids" },
  { src: "/images/activities/tanabata.jpg", alt: "七夕かざりと子どもたち", caption: "七夕イベント", category: "kids" },
  { src: "/images/activities/kids-asobi.jpg", alt: "絵本やおもちゃが並ぶ子どもの居場所", caption: "子どもの居場所づくり", category: "kids" },
  { src: "/images/activities/kodomo-shokudo-1.jpg", alt: "ハッピーカフェのおにぎり会で食事をする子どもたちと学生", caption: "ハッピーカフェ おにぎり会", category: "kids" },
  { src: "/images/activities/kodomo-shokudo-2.jpg", alt: "ハッピーカフェでみんなで食卓を囲む様子", caption: "みんなでいただきます", category: "kids" },
  { src: "/images/activities/kawaasobi.jpg", alt: "川遊びをする子どもたちと学生", caption: "夏の野外活動", category: "kids" },
  { src: "/images/activities/chiiki-event-gym.jpg", alt: "小学校の体育館で行われた地域イベント", caption: "地域イベントへの参加", category: "community" },
  { src: "/images/activities/zaimokucho-kids.jpg", alt: "材木町公民館サロンで子どもたちとハイタッチする学生", caption: "材木町公民館サロン", category: "community" },
  { src: "/images/activities/ground-golf.jpg", alt: "屋外でグラウンドゴルフをする学生", caption: "グラウンドゴルフ交流", category: "community" },
  { src: "/images/activities/chiiki-matsuri.jpg", alt: "テントの下で賑わう地域のお祭り", caption: "地域のお祭り", category: "community" },
  { src: "/images/activities/mascot.jpg", alt: "マスコットキャラクターと記念撮影する学生", caption: "イベントでの一コマ", category: "community" },
  { src: "/images/activities/members-group.jpg", alt: "活動後に集合写真を撮る笑顔の部員たち", caption: "活動後のメンバー", category: "community" },
];

/** カテゴリで絞り込める写真ギャラリー */
export function PhotoGallery() {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const filtered = PHOTOS.filter((p) => category === "all" || p.category === category);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="写真の絞り込み">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          すべて
        </Chip>
        {CATEGORIES.filter((c) => PHOTOS.some((p) => p.category === c.key)).map((c) => (
          <Chip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
            {c.emoji} {c.label}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <figure key={p.src} className="group overflow-hidden rounded-xl bg-cream-200">
            <Image
              src={p.src}
              alt={p.alt}
              width={600}
              height={450}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <figcaption className="px-2 py-1.5 text-xs font-bold text-ink-light">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
        active ? "bg-leaf-600 text-white" : "border border-cream-200 bg-white text-ink hover:bg-leaf-50"
      )}
    >
      {children}
    </button>
  );
}
