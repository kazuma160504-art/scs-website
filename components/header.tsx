"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { href: "/philosophy", label: "理念" },
  { href: "/origin", label: "活動の原点" },
  { href: "/activities", label: "活動実績" },
  { href: "/plans", label: "今後の活動" },
  { href: "/operations", label: "活動準備" },
  { href: "/contacts", label: "連絡先" },
];

const SUB_NAV = [
  { href: "/blog", label: "活動ブログ" },
  { href: "/faq", label: "よくある質問" },
  { href: "/members", label: "部員名簿" },
  { href: "/for-partners", label: "地域協力者様へ" },
  { href: "/donate", label: "支援のお願い" },
  { href: "/documents", label: "提出書類" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-ink"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-600 text-white">
            <HeartHandshake className="h-5 w-5" aria-hidden />
          </span>
          <span>
            <span className="block text-lg leading-tight">SCS</span>
            <span className="block text-[10px] font-medium leading-tight text-ink-light">
              佐賀大学医学部学生地域交流の会
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="メインナビゲーション">
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-leaf-50 hover:text-leaf-700",
                pathname.startsWith(item.href) ? "bg-leaf-100 text-leaf-700" : "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-ink hover:bg-cream-100 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-cream-200 bg-cream-50 px-4 py-4 lg:hidden"
          aria-label="モバイルナビゲーション"
        >
          <ul className="grid grid-cols-2 gap-1">
            {[...MAIN_NAV, ...SUB_NAV].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-bold",
                    pathname.startsWith(item.href)
                      ? "bg-leaf-100 text-leaf-700"
                      : "text-ink hover:bg-cream-100"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
