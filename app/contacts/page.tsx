import type { Metadata } from "next";
import { Phone, Mail, GraduationCap, Users } from "lucide-react";
import { PageHeader, Card, SectionTitle, TodoNote } from "@/components/ui";
import { PasswordGate } from "@/components/password-gate";
import { PartnerTable } from "@/components/partner-table";
import { isAuthed } from "@/lib/auth";
import { getMembersData, getPartnersData } from "@/lib/secure-data";

export const metadata: Metadata = {
  title: "連絡先一覧",
  description: "SCS の役員・顧問・地域交流先の連絡先一覧（部員・関係者限定）。",
};

export default async function ContactsPage() {
  const authed = await isAuthed();
  const members = authed ? getMembersData() : null;
  const partners = authed ? getPartnersData() : null;

  return (
    <>
      <PageHeader
        emoji="📞"
        title="連絡先一覧"
        lead="役員・グループ責任者・顧問教員・地域交流先の連絡先です。個人情報を含むため部員・関係者限定です。"
      />
      <div className="mx-auto max-w-5xl px-4 py-12">
        {!authed ? (
          <PasswordGate />
        ) : !members || !partners ? (
          <TodoNote>
            連絡先データを復号できませんでした。環境変数 MEMBERS_PASSWORD が暗号化時のパスワードと一致しているか確認し、
            パスワードを変更した場合は「npm run encrypt-data」で data/*.enc.json を再生成してください。
          </TodoNote>
        ) : (
          <div className="space-y-14">
            <section aria-labelledby="officers-heading">
              <SectionTitle>
                <span id="officers-heading">👥 役員</span>
              </SectionTitle>
              <div className="grid gap-4 md:grid-cols-3">
                {members.officers.map((o) => (
                  <Card key={o.name} className="p-5">
                    <p className="text-xs font-bold text-leaf-700">{o.role}</p>
                    <h3 className="mt-1 text-lg font-black text-ink">{o.name}</h3>
                    <p className="text-xs text-ink-light">学籍番号 {o.studentId}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-leaf-600" aria-hidden />
                      <a href={`tel:${o.phone}`} className="hover:underline">
                        {o.phone}
                      </a>
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-leaf-600" aria-hidden />
                      <a href={`mailto:${o.email}`} className="break-all hover:underline">
                        {o.email}
                      </a>
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="leaders-heading">
              <SectionTitle>
                <span id="leaders-heading" className="inline-flex items-center gap-2">
                  <Users className="h-6 w-6 text-leaf-600" aria-hidden /> グループ責任者
                </span>
              </SectionTitle>
              <div className="grid gap-4 md:grid-cols-3">
                {members.groupLeaders.map((g) => (
                  <Card key={g.group} className="p-5">
                    <p className="text-xs font-bold text-apricot-600">{g.group}</p>
                    <h3 className="mt-1 text-lg font-black text-ink">{g.name}</h3>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="advisor-heading">
              <SectionTitle>
                <span id="advisor-heading" className="inline-flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-leaf-600" aria-hidden /> 顧問教員
                </span>
              </SectionTitle>
              <Card className="p-5">
                <h3 className="text-lg font-black text-ink">{members.advisor.name} 先生</h3>
                <p className="text-sm text-ink-light">{members.advisor.affiliation}</p>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-leaf-600" aria-hidden />
                  <a href={`mailto:${members.advisor.email}`} className="hover:underline">
                    {members.advisor.email}
                  </a>
                </p>
              </Card>
            </section>

            <section aria-labelledby="alumni-heading">
              <SectionTitle sub="活動を支えてくださった先輩方です。">
                <span id="alumni-heading">🎓 OB・OG</span>
              </SectionTitle>
              <Card className="p-5">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-ink">
                  {members.alumni.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </Card>
            </section>

            <section aria-labelledby="partners-heading">
              <SectionTitle sub="いつもお世話になっている地域の皆さまです。検索ボックスで絞り込めます。">
                <span id="partners-heading">🤝 地域交流先</span>
              </SectionTitle>
              <PartnerTable partners={partners} />
            </section>
          </div>
        )}
      </div>
    </>
  );
}
