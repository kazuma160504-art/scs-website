"use client";

import { useFormState } from "react-dom";
import { Lock } from "lucide-react";
import { login } from "@/lib/auth";

/** 部員名簿・連絡先ページの簡易パスワードゲート（合言葉方式） */
export function PasswordGate() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-cream-200 bg-white p-8 text-center">
      <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-leaf-100 text-leaf-700">
        <Lock className="h-6 w-6" aria-hidden />
      </span>
      <h2 className="text-lg font-black text-ink">部員・関係者限定ページ</h2>
      <p className="mt-2 text-sm text-ink-light">
        このページには個人情報が含まれるため、部内で共有している合言葉が必要です。
        合言葉が分からない場合は部長・役員に確認してください。
      </p>
      <form action={action} className="mt-6 space-y-3">
        <label className="block text-left">
          <span className="mb-1 block text-sm font-bold text-ink">合言葉</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-cream-200 px-4 py-2.5 focus:border-leaf-500 focus:outline-none focus:ring-2 focus:ring-leaf-100"
          />
        </label>
        {state?.error && (
          <p role="alert" className="text-sm font-bold text-apricot-600">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-leaf-600 py-3 text-sm font-bold text-white hover:bg-leaf-700"
        >
          閲覧する
        </button>
      </form>
    </div>
  );
}
