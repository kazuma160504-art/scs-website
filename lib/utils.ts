import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateJa(iso: string): string {
  if (!iso) return "日付未定";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 4月始まりの年度を返す（例: 2025-06-01 → 2025） */
export function fiscalYearOf(iso: string): number {
  const d = new Date(iso + "T00:00:00");
  const y = d.getFullYear();
  return d.getMonth() + 1 >= 4 ? y : y - 1;
}
