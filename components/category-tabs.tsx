"use client";

import { useState } from "react";
import Image from "next/image";
import { CATEGORIES, type CategoryKey } from "@/lib/categories";
import { cn } from "@/lib/utils";

// 実写真があるカテゴリはここで割り当てる（ないものはプレースホルダ画像のまま）
const TAB_IMAGES: Partial<Record<CategoryKey, string>> = {
  senior: "/images/activities/johoku-taiso.jpg",
  kids: "/images/activities/kids-asobi.jpg",
  community: "/images/activities/chiiki-event-gym.jpg",
};

/** 活動カテゴリ別紹介のタブ */
export function CategoryTabs() {
  const [active, setActive] = useState<CategoryKey>("senior");
  const current = CATEGORIES.find((c) => c.key === active)!;

  return (
    <div>
      <div role="tablist" aria-label="活動カテゴリ" className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={active === c.key}
            id={`tab-${c.key}`}
            aria-controls={`panel-${c.key}`}
            onClick={() => setActive(c.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold transition-colors",
              active === c.key
                ? "bg-leaf-600 text-white"
                : "border border-cream-200 bg-white text-ink hover:bg-leaf-50"
            )}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current.key}`}
        aria-labelledby={`tab-${current.key}`}
        className="grid gap-6 rounded-2xl border border-cream-200 bg-white p-6 md:grid-cols-[1fr_240px]"
      >
        <div>
          <h3 className="mb-2 text-xl font-black text-ink">
            {current.emoji} {current.label}
          </h3>
          <p className="leading-relaxed text-ink-light">{current.description}</p>
        </div>
        <Image
          src={TAB_IMAGES[current.key] ?? `/images/activities/placeholder-${current.key}.svg`}
          alt={`${current.label}の活動の様子`}
          width={360}
          height={240}
          className="h-40 w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
