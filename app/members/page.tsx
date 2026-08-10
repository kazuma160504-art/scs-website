import type { Metadata } from "next";
import { PageHeader, Card, SectionTitle, TodoNote } from "@/components/ui";
import { PasswordGate } from "@/components/password-gate";
import { isAuthed } from "@/lib/auth";
import { getMembersData } from "@/lib/secure-data";
import organization from "@/data/organization.json";

export const metadata: Metadata = {
  title: "部員名簿",
  description: "SCS 部員名簿（部員限定）。",
};

export default async function MembersPage() {
  const authed = await isAuthed();
  const members = authed ? getMembersData() : null;

  return (
    <>
      <PageHeader
        emoji="📋"
        title="部員名簿"
        lead={`${organization.asOf} 時点で ${organization.totalCount} 名（${organization.composition}）が活動しています。`}
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        {!authed ? (
          <PasswordGate />
        ) : !members ? (
          <TodoNote>
            名簿データを復号できませんでした。環境変数 MEMBERS_PASSWORD が暗号化時のパスワードと一致しているか確認し、
            パスワードを変更した場合は「npm run encrypt-data」で data/*.enc.json を再生成してください。
          </TodoNote>
        ) : (
          <div className="space-y-8">
            <TodoNote>{members.note}</TodoNote>
            <section aria-labelledby="roster-heading">
              <SectionTitle>
                <span id="roster-heading">名簿（data/private/members.json で管理・暗号化して公開）</span>
              </SectionTitle>
              <Card className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <caption className="sr-only">部員名簿</caption>
                  <thead>
                    <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-light">
                      <th scope="col" className="px-4 py-3 font-bold">氏名</th>
                      <th scope="col" className="px-4 py-3 font-bold">学籍番号</th>
                      <th scope="col" className="px-4 py-3 font-bold">学部</th>
                      <th scope="col" className="px-4 py-3 font-bold">加入日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.members.map((m) => (
                      <tr key={m.name} className="border-b border-cream-100 last:border-0">
                        <th scope="row" className="px-4 py-3 font-bold text-ink">
                          {m.name}
                        </th>
                        <td className="px-4 py-3">{m.studentId}</td>
                        <td className="px-4 py-3">{m.faculty}</td>
                        <td className="px-4 py-3 text-ink-light">{m.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
