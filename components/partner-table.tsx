"use client";

import { useState } from "react";
import { Search, Phone } from "lucide-react";

interface Partner {
  name: string;
  contact: string;
  phone: string;
  category: string;
  activity: string;
}

/** 地域交流先の検索可能テーブル */
export function PartnerTable({ partners }: { partners: Partner[] }) {
  const [q, setQ] = useState("");

  const filtered = partners.filter((p) =>
    [p.name, p.contact, p.category, p.activity].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <label className="relative mb-4 block max-w-md">
        <span className="sr-only">地域交流先を検索</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-light"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="名称・担当者・カテゴリで検索"
          className="w-full rounded-full border border-cream-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-100"
        />
      </label>

      <div className="overflow-x-auto rounded-2xl border border-cream-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">地域交流先一覧</caption>
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-light">
              <th scope="col" className="px-4 py-3 font-bold">名称</th>
              <th scope="col" className="px-4 py-3 font-bold">担当者</th>
              <th scope="col" className="px-4 py-3 font-bold">電話</th>
              <th scope="col" className="px-4 py-3 font-bold">関連活動</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.name} className="border-b border-cream-100 last:border-0 hover:bg-cream-50">
                <th scope="row" className="px-4 py-3 font-bold text-ink">
                  {p.name}
                </th>
                <td className="px-4 py-3">{p.contact || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {p.phone ? (
                    <span className="inline-flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-leaf-600" aria-hidden />
                      {p.phone}
                    </span>
                  ) : (
                    "TODO: 要確認"
                  )}
                </td>
                <td className="px-4 py-3 text-ink-light">{p.activity}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-light">
                  「{q}」に一致する交流先はありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
