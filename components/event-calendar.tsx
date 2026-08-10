"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryMap, type CategoryKey } from "@/lib/categories";

/* events.json の定例ルール＋単発イベントを月・週・リスト表示に展開するカレンダー */

interface RegularEvent {
  id: string;
  title: string;
  rule:
    | { type: "weekly"; weekday: number }
    | { type: "monthly-weekday"; week: number; weekday: number }
    | { type: "monthly-tbd" };
  time: string;
  location: string;
  category: string;
  emoji?: string;
  note?: string;
}

interface SpecialEvent {
  date: string;
  title: string;
  time: string;
  location: string;
  category: string;
  emoji?: string;
  note?: string;
}

export interface EventsData {
  fiscalYear: string;
  regular: RegularEvent[];
  special: SpecialEvent[];
}

interface DayEvent {
  date: Date;
  title: string;
  time: string;
  location: string;
  category: string;
  emoji?: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function ymd(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 指定した月の全開催日を展開する */
function expandMonth(data: EventsData, year: number, month: number): Map<string, DayEvent[]> {
  const map = new Map<string, DayEvent[]>();
  const push = (d: Date, e: Omit<DayEvent, "date">) => {
    const key = ymd(d);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push({ date: d, ...e });
  };

  const last = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= last; day++) {
    const d = new Date(year, month, day);
    for (const ev of data.regular) {
      const r = ev.rule;
      const matches =
        (r.type === "weekly" && d.getDay() === r.weekday) ||
        (r.type === "monthly-weekday" &&
          d.getDay() === r.weekday &&
          Math.ceil(day / 7) === r.week);
      if (matches) {
        push(d, {
          title: ev.title,
          time: ev.time,
          location: ev.location,
          category: ev.category,
          emoji: ev.emoji,
        });
      }
    }
  }
  for (const ev of data.special) {
    const d = new Date(ev.date + "T00:00:00");
    if (d.getFullYear() === year && d.getMonth() === month) {
      push(d, {
        title: ev.title,
        time: ev.time,
        location: ev.location,
        category: ev.category,
        emoji: ev.emoji,
      });
    }
  }
  return map;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function EventCalendar({ data }: { data: EventsData }) {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState<"month" | "week" | "list">("month");
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const events = useMemo(
    () => expandMonth(data, cursor.getFullYear(), cursor.getMonth()),
    [data, cursor]
  );

  const move = (delta: number) =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));

  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="前の月"
            className="rounded-lg p-2 hover:bg-cream-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="min-w-[8rem] text-center text-lg font-black text-ink">
            {cursor.getFullYear()}年{cursor.getMonth() + 1}月
          </p>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="次の月"
            className="rounded-lg p-2 hover:bg-cream-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex rounded-full border border-cream-200 p-1" role="group" aria-label="表示切り替え">
          {(
            [
              ["month", "月"],
              ["week", "週"],
              ["list", "リスト"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-bold",
                view === v ? "bg-leaf-600 text-white" : "text-ink hover:bg-cream-100"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "month" && <MonthGrid cursor={cursor} events={events} today={today} />}
      {view === "week" && <WeekList cursor={cursor} events={events} today={today} />}
      {view === "list" && <ListView events={events} />}

      <p className="mt-4 text-xs text-ink-light">
        ※ 定例活動は data/events.json のルールから自動生成しています。祝日・臨時変更は反映されないため、最新情報は部内 LINE を確認してください。
      </p>
    </div>
  );
}

function MonthGrid({
  cursor,
  events,
  today,
}: {
  cursor: Date;
  events: Map<string, DayEvent[]>;
  today: Date;
}) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const lastDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: first.getDay() }, () => null),
    ...Array.from({ length: lastDate }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[560px] grid-cols-7 overflow-hidden rounded-xl border border-cream-200 text-sm">
        {WEEKDAYS.map((w, i) => (
          <div
            key={w}
            className={cn(
              "border-b border-cream-200 bg-cream-100 px-2 py-2 text-center text-xs font-bold",
              i === 0 ? "text-apricot-600" : i === 6 ? "text-leaf-600" : "text-ink-light"
            )}
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="min-h-[84px] border-b border-r border-cream-100 p-1.5 align-top">
            {d && (
              <>
                <p
                  className={cn(
                    "mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    ymd(d) === ymd(today) ? "bg-leaf-600 text-white" : "text-ink"
                  )}
                >
                  {d.getDate()}
                </p>
                {(events.get(ymd(d)) ?? []).map((e, j) => (
                  <p
                    key={j}
                    className="mb-0.5 truncate rounded bg-leaf-50 px-1 py-0.5 text-[11px] leading-tight text-leaf-700"
                    title={`${e.title} ${e.time}`}
                  >
                    {e.emoji} {e.title}
                  </p>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekList({
  cursor,
  events,
  today,
}: {
  cursor: Date;
  events: Map<string, DayEvent[]>;
  today: Date;
}) {
  // 表示中の月に今日が含まれればその週、そうでなければ月の第1週
  const base =
    today.getFullYear() === cursor.getFullYear() && today.getMonth() === cursor.getMonth()
      ? today
      : new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const weekStart = new Date(base);
  weekStart.setDate(base.getDate() - base.getDay());

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  return (
    <ul className="divide-y divide-cream-100 rounded-xl border border-cream-200">
      {days.map((d) => (
        <li key={ymd(d)} className="flex gap-4 px-4 py-3">
          <p className={cn("w-20 shrink-0 text-sm font-bold", ymd(d) === ymd(today) && "text-leaf-700")}>
            {d.getMonth() + 1}/{d.getDate()}（{WEEKDAYS[d.getDay()]}）
          </p>
          <div className="flex-1 space-y-1">
            {(events.get(ymd(d)) ?? []).map((e, j) => (
              <EventRow key={j} e={e} />
            ))}
            {!(events.get(ymd(d)) ?? []).length && (
              <p className="text-sm text-ink-light">予定なし</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ListView({ events }: { events: Map<string, DayEvent[]> }) {
  const flat = Array.from(events.values()).flat().sort((a, b) => +a.date - +b.date);
  if (!flat.length) return <p className="py-8 text-center text-ink-light">この月の予定はありません。</p>;
  return (
    <ul className="divide-y divide-cream-100 rounded-xl border border-cream-200">
      {flat.map((e, i) => (
        <li key={i} className="flex gap-4 px-4 py-3">
          <p className="w-20 shrink-0 text-sm font-bold">
            {e.date.getMonth() + 1}/{e.date.getDate()}（{WEEKDAYS[e.date.getDay()]}）
          </p>
          <EventRow e={e} />
        </li>
      ))}
    </ul>
  );
}

function EventRow({ e }: { e: DayEvent }) {
  const cat = categoryMap[e.category as CategoryKey];
  return (
    <div className="text-sm">
      <p className="font-bold text-ink">
        {e.emoji} {e.title}
        {cat && (
          <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[11px] font-medium", cat.color)}>
            {cat.label}
          </span>
        )}
      </p>
      <p className="text-ink-light">
        {e.time}
        {e.location && ` ・ ${e.location}`}
      </p>
    </div>
  );
}
