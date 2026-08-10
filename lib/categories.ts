// 活動カテゴリの定義。新カテゴリを増やす場合はここに1行追加するだけでよい。
export type CategoryKey = "senior" | "kids" | "down" | "community" | "external";

export interface Category {
  key: CategoryKey;
  label: string;
  emoji: string;
  color: string; // Tailwind クラス（バッジ用）
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    key: "senior",
    label: "高齢者サロン",
    emoji: "🌻",
    color: "bg-apricot-100 text-apricot-700",
    description:
      "城北団地サロン、ハッピーカフェ（東高木公民館）、医大北公民館サロン、白石サロン、嘉瀬公民館サロン、北堀端サロン、辻公民館、オレンジカフェ、新栄公民館サロンなど、地域の高齢者サロンで健康体操・脳トレ・お茶会を行っています。",
  },
  {
    key: "kids",
    label: "子ども支援",
    emoji: "🎈",
    color: "bg-leaf-100 text-leaf-700",
    description:
      "さんどカフェ（本庄公民館）、えがお食堂（赤松公民館）、上高木公民館 子供の居場所づくり、greenbook 学習支援、夏休みお助け隊など、子どもたちの居場所づくりと学習支援を行っています。",
  },
  {
    key: "down",
    label: "ダウン症児支援",
    emoji: "😊",
    color: "bg-apricot-100 text-apricot-700",
    description:
      "笑育舎と協力し、クッキング、BBQ、クリスマス会、創作イベントなど、ダウン症のある子どもたちとご家族の楽しい時間づくりをお手伝いしています。",
  },
  {
    key: "community",
    label: "地域交流",
    emoji: "🤝",
    color: "bg-leaf-100 text-leaf-700",
    description:
      "城北団地レクリエーション大会、本庄小学校 探究授業、日清小学校 運動会補助、こどもの居場所サミット2026 参加など、地域行事への参加・協力を行っています。",
  },
  {
    key: "external",
    label: "学外イベント",
    emoji: "🌏",
    color: "bg-cream-200 text-ink",
    description:
      "性教育授業、SPIRA多文化共生セミナー、在宅医療連合学会など、学外のイベント・学会にも参加し学びを深めています。",
  },
];

export const categoryMap = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
) as Record<CategoryKey, Category>;
