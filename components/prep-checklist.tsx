"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Checklist {
  id: string;
  title: string;
  emoji: string;
  items: string[];
  flow: string[];
}

/** 活動別の準備物チェックリスト＋当日フロー（アコーディオン形式） */
export function PrepChecklists({ checklists }: { checklists: Checklist[] }) {
  const [openId, setOpenId] = useState<string | null>(checklists[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {checklists.map((c) => {
        const open = openId === c.id;
        return (
          <div key={c.id} className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : c.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-ink hover:bg-cream-50"
            >
              <span>
                <span className="mr-2">{c.emoji}</span>
                {c.title}
              </span>
              <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} aria-hidden />
            </button>
            {open && (
              <div className="grid gap-6 border-t border-cream-100 px-5 py-5 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-black text-leaf-700">✅ 準備物チェックリスト</h4>
                  <ul className="space-y-2">
                    {c.items.map((item, i) => (
                      <li key={i}>
                        <label className="flex cursor-pointer items-start gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 rounded border-cream-200 accent-leaf-600"
                          />
                          <span className={item.startsWith("TODO") ? "text-apricot-600" : ""}>{item}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-black text-leaf-700">🕐 当日の流れ</h4>
                  <ol className="space-y-2">
                    {c.flow.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-100 text-[11px] font-bold text-leaf-700">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
