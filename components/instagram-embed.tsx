import { Instagram } from "lucide-react";
import { TodoNote } from "@/components/ui";

/**
 * Instagram 最新投稿の埋め込みプレースホルダ。
 * URL 決定後、下の EMBED_URL に投稿 or プロフィールの埋め込み URL を設定すると iframe 表示になる。
 * 例: https://www.instagram.com/p/XXXXXXXX/embed
 */
const EMBED_URL = ""; // TODO: 要確認 — Instagram の URL を部長に確認して設定

export function InstagramEmbed() {
  if (!EMBED_URL) {
    return (
      <div className="rounded-2xl border border-cream-200 bg-white p-6 text-center">
        <Instagram className="mx-auto mb-3 h-8 w-8 text-apricot-500" aria-hidden />
        <p className="font-bold text-ink">Instagram 最新投稿</p>
        <div className="mt-3">
          <TodoNote>
            Instagram の URL が確定したら components/instagram-embed.tsx の EMBED_URL を設定してください。
          </TodoNote>
        </div>
      </div>
    );
  }
  return (
    <iframe
      src={EMBED_URL}
      title="SCS の Instagram 最新投稿"
      className="h-[480px] w-full rounded-2xl border border-cream-200 bg-white"
      loading="lazy"
    />
  );
}
