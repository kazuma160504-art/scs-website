"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORIES, categoryMap, type CategoryKey } from "@/lib/categories";
import type { ActivityMeta } from "@/lib/content";
import { cn, formatDateJa, fiscalYearOf } from "@/lib/utils";
import { Badge } from "@/components/ui";

/** 活動履歴タイムライン（カテゴリ／年度フィルタ付き） */
export function ActivityTimeline({ activities }: { activities: ActivityMeta[] }) {
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [year, setYear] = useState<number | "all">("all");

  const years = useMemo(
    () =>
      Array.from(new Set(activities.filter((a) => a.date).map((a) => fiscalYearOf(a.date)))).sort(
        (a, b) => b - a
      ),
    [activities]
  );

  const filtered = activities.filter(
    (a) =>
      (category === "all" || a.category === category) &&
      (year === "all" || (a.date && fiscalYearOf(a.date) === year))
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2" role="group" aria-label="活動の絞り込み">
        <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
          すべて
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
            {c.emoji} {c.label}
          </FilterChip>
        ))}
        <select
          className="ml-auto rounded-full border border-cream-200 bg-white px-4 py-1.5 text-sm font-bold text-ink"
          value={year}
          onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
          aria-label="年度で絞り込み"
        >
          <option value="all">全年度</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}年度
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-ink-light">該当する活動がありません。</p>
      ) : (
        <ol className="relative space-y-6 border-l-2 border-leaf-100 pl-6">
          {filtered.map((a) => {
            const cat = categoryMap[a.category];
            return (
              <li key={a.slug} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-leaf-500"
                  aria-hidden
                />
                <p className="text-sm text-ink-light">{formatDateJa(a.date)}</p>
                <Link
                  href={`/blog/${a.slug}`}
                  className="mt-0.5 block font-bold text-ink hover:text-leaf-700 hover:underline"
                >
                  {a.emoji && <span className="mr-1">{a.emoji}</span>}
                  {a.title}
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <Badge className={cat.color}>
                    {cat.emoji} {cat.label}
                  </Badge>
                </div>
                {a.excerpt && <p className="mt-1 text-sm text-ink-light">{a.excerpt}</p>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function FilterChip({
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
        active ? "bg-leaf-600 text-white" : "bg-white text-ink border border-cream-200 hover:bg-leaf-50"
      )}
    >
      {children}
    </button>
  );
}
