import Link from "next/link";
import { Instagram, Facebook, FolderOpen, Mail, MapPin } from "lucide-react";

const SNS = {
  instagram: "https://www.instagram.com/scs.official2025/",
  facebook: "", // TODO: 要確認 — Facebook の URL（アカウントがあれば）
  drive: "https://drive.google.com/drive/folders/1s7ULpa6azJ4fPzaSq-ZmP1T6VBQ7FdSd",
};

const FOOTER_LINKS = [
  { href: "/philosophy", label: "理念" },
  { href: "/origin", label: "活動の原点" },
  { href: "/activities", label: "活動実績" },
  { href: "/plans", label: "今後の活動" },
  { href: "/operations", label: "活動準備" },
  { href: "/contacts", label: "連絡先" },
  { href: "/blog", label: "活動ブログ" },
  { href: "/faq", label: "よくある質問" },
  { href: "/members", label: "部員名簿" },
  { href: "/for-partners", label: "地域協力者様へ" },
  { href: "/donate", label: "支援のお願い" },
  { href: "/documents", label: "提出書類" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-200 bg-leaf-700 text-leaf-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-black text-white">SCS</p>
            <p className="mt-1 text-sm">Saga medical Community Support</p>
            <p className="text-sm">佐賀大学医学部学生地域交流の会</p>
            <p className="mt-4 flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              〒849-8501 佐賀県佐賀市鍋島5丁目1-1 佐賀大学医学部
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              <a href="mailto:hope_8pa9fs@icloud.com" className="underline hover:text-white">
                hope_8pa9fs@icloud.com（部長）
              </a>
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <p className="mb-3 font-bold text-white">サイトマップ</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-3 font-bold text-white">SNS・資料</p>
            <ul className="space-y-2 text-sm">
              <li>
                <SnsLink href={SNS.instagram} icon={<Instagram className="h-4 w-4" aria-hidden />}>
                  Instagram
                </SnsLink>
              </li>
              <li>
                <SnsLink href={SNS.facebook} icon={<Facebook className="h-4 w-4" aria-hidden />}>
                  Facebook
                </SnsLink>
              </li>
              <li>
                <SnsLink href={SNS.drive} icon={<FolderOpen className="h-4 w-4" aria-hidden />}>
                  Google Drive（部員用）
                </SnsLink>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-leaf-600 pt-6 text-center text-xs text-leaf-100">
          © {new Date().getFullYear()} SCS — Saga medical Community Support
        </p>
      </div>
    </footer>
  );
}

function SnsLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span className="flex items-center gap-2 text-leaf-300">
        {icon}
        {children}（TODO: URL 要確認）
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-white hover:underline"
    >
      {icon}
      {children}
    </a>
  );
}
