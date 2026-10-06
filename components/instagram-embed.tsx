import { Instagram } from "lucide-react";
import { TodoNote } from "@/components/ui";

/**
 * Instagram の埋め込み。プロフィールの /embed を iframe 表示する。
 * 個別投稿を出したい場合は https://www.instagram.com/p/XXXXXXXX/embed に変更。
 */
const EMBED_URL = "https://www.instagram.com/scs.official2025/embed";

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
