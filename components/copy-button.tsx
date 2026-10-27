"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** 口座番号などをワンタップでコピーするボタン */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // コピーが許可されていない環境では何もしない（文字は選択してコピーできる）
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label}をコピー`}
      className="inline-flex items-center gap-1 rounded-full border border-leaf-300 bg-white px-3 py-1 text-xs font-bold text-leaf-700 transition hover:bg-leaf-50"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? "コピーしました" : "コピー"}
    </button>
  );
}
