import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PageHeader, Card, TodoNote } from "@/components/ui";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "提出書類",
  description: "学生団体継続願・活動報告書・活動計画書のダウンロード。",
};

const DOCS = [
  {
    title: "学生団体継続願",
    file: "/documents/continuation-request.pdf",
    note: "毎年度、学生課に提出する継続願のひな形。",
  },
  {
    title: "活動報告書",
    file: "/documents/activity-report.pdf",
    note: "年度末に提出する活動報告書のひな形。",
  },
  {
    title: "活動計画書",
    file: "/documents/activity-plan.pdf",
    note: "年度初めに提出する活動計画書のひな形。",
  },
];

export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        emoji="📄"
        title="提出書類"
        lead="学生課への提出書類のひな形をまとめています。役員が年度更新の際に使用します。"
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
        <FadeIn>
          <TodoNote>
            TODO: 要確認 — 各書類の PDF/Word ファイルを public/documents/ に置くと、下のリンクからダウンロードできるようになります。
          </TodoNote>
        </FadeIn>
        {DOCS.map((d, i) => (
          <FadeIn key={d.title} delay={i * 0.05}>
            <Card className="flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                <FileText className="h-6 w-6" aria-hidden />
              </span>
              <div className="flex-1">
                <h2 className="font-black text-ink">{d.title}</h2>
                <p className="text-sm text-ink-light">{d.note}</p>
              </div>
              <a
                href={d.file}
                className="rounded-full border-2 border-leaf-600 px-4 py-2 text-sm font-bold text-leaf-700 hover:bg-leaf-50"
                download
              >
                ダウンロード
              </a>
            </Card>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
