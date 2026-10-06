# SCS 公式サイト／情報共有アプリ

佐賀大学医学部学生地域交流の会 **SCS（Saga medical Community Support）** の公式ホームページ兼、部員・地域協力者向け情報共有アプリです。

- 新入部員が入部前後に参照するポータル
- 地域協力者が団体を理解するための紹介サイト
- 既存部員が活動準備（持ち物・流れ・連絡先）で参照するハンドブック

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 14（App Router）+ TypeScript |
| UI | Tailwind CSS + 自前の shadcn/ui 風コンポーネント（components/ui.tsx） |
| コンテンツ | Markdown / MDX ファイル（content/ 配下）+ JSON（data/ 配下） |
| フォント | Noto Sans JP（next/font） |
| アイコン | Lucide React |
| アニメーション | Framer Motion（控えめな fade-in のみ） |
| デプロイ | Vercel（無料枠） |

## セットアップ

Node.js 18.17 以上（推奨: 20 以上）が必要です。

```bash
git clone <このリポジトリのURL>
cd scs-website
npm install
cp .env.example .env.local   # Windows は copy .env.example .env.local
npm run dev
```

http://localhost:3000 を開くとサイトが表示されます。

### 環境変数（.env.local）

| 変数 | 説明 |
|---|---|
| `MEMBERS_PASSWORD` | 部員名簿（/members）・連絡先一覧（/contacts）を閲覧するための合言葉。未設定時は開発用デフォルト `scs2022`。**本番（Vercel）では必ず独自の値を設定すること。** |

## ディレクトリ構成

```
scs-website/
├── app/                  # ページ（Next.js App Router）
│   ├── page.tsx          # トップページ
│   ├── philosophy/       # ① 理念
│   ├── origin/           # ② 活動の原点
│   ├── activities/       # ③ 活動実績・内容（表彰・タイムライン・ギャラリー）
│   ├── plans/            # ④ 今後の活動（カレンダー・申込）
│   ├── operations/       # ⑤ 活動準備物・流れ
│   ├── contacts/         # 連絡先一覧（合言葉つき）
│   ├── members/          # 部員名簿（合言葉つき）
│   ├── blog/             # 活動ブログ（content/activities を表示）
│   ├── faq/ donate/ for-partners/ documents/
├── components/           # UI コンポーネント
├── content/
│   ├── activities/       # 活動レポート MDX（yyyy-mm-dd-slug.mdx）★部員が主に編集する場所
│   └── pages/            # 理念・原点の本文 MDX
├── data/
│   ├── members.enc.json  # 部員名簿・役員・OBOG（暗号化済み）
│   ├── partners.enc.json # 地域交流先（暗号化済み）
│   ├── organization.json # 公開可能な団体基本情報（部員数・顧問名）
│   ├── awards.json       # 表彰歴・助成金
│   ├── events.json       # 定例活動・予定イベント（カレンダーの元データ）
│   ├── checklists.json   # 活動別の準備物・当日フロー
│   └── private/          # 平文の名簿・協力先（gitignore済み・役員のみ保持）
├── lib/                  # コンテンツ読み込み・カテゴリ定義・認証
└── public/
    ├── images/activities # 活動写真
    ├── images/banners    # ヒーロー画像
    └── documents/        # 提出書類 PDF（配置すると /documents からDLできる）
```

## コンテンツの追加・編集方法

コードを書かなくても、**content/ と data/ のファイルを編集するだけ**でサイトを更新できます。詳しい手順は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

- **活動レポートを書く** → `content/activities/2026-05-10-johoku-salon.mdx` のようにファイルを追加
- **予定イベントを追加** → `data/events.json` の `special` に1件追加
- **協力先・名簿を編集** → `data/private/*.json` を編集して `npm run encrypt-data`（役員のみ。詳細は「個人情報の取り扱い」参照）
- **理念の本文を書く** → `content/pages/philosophy.mdx` を編集
- **写真を追加** → `public/images/activities/` に置き、MDX から `![説明](/images/activities/xxx.jpg)` で参照

## デプロイ（Vercel）

1. このリポジトリを GitHub に push する
2. [vercel.com](https://vercel.com) に GitHub アカウントでログイン → **Add New → Project** → リポジトリを選択
3. Framework は自動で Next.js と認識される。**Environment Variables に `MEMBERS_PASSWORD` を設定**して Deploy
4. 以後、`main` ブランチに push（= GitHub 上でファイルを編集して Commit）するだけで自動デプロイされる

### 部員による更新フロー（管理者向け）

```
GitHub の Web エディタで content/ のファイルを編集
→ Commit changes（main へ直接 or Pull Request）
→ Vercel が自動でビルド・公開（1〜2分）
```

GitHub アカウントさえあればスマホからでも更新できます。編集権限は部長・役員が GitHub の Collaborators で管理してください。

## TODO（未確定情報）

コード・データ内に `TODO: 要確認` として明示しています。確認先は部長（森一真）。

- [ ] Instagram / Facebook の URL（components/footer.tsx, components/instagram-embed.tsx）
- [ ] Google Drive の共有 URL（components/footer.tsx, app/operations/page.tsx）
- [ ] 結成年月日の確定日（content/pages/origin.mdx, app/origin/page.tsx）
- [ ] 理念・原点の正式な本文（content/pages/*.mdx — 現在は仮置き）
- [ ] 部員名簿の完全版（data/private/members.json を編集して npm run encrypt-data — 現在は役員のみ）
- [ ] 参加申込・サロン依頼の Google Forms URL（app/plans, app/for-partners）
- [ ] 提出書類 PDF の配置（public/documents/）
- [ ] 古川先生寄付・SSF寄付の金額と時期（data/awards.json）
- [ ] 上高木公民館 子供の居場所づくりの開催日ルール（data/events.json）
- [ ] 活動レポート（content/activities/ — 現在はプレースホルダ記事）を実際の内容・写真に差し替え

## 個人情報の取り扱い（公開リポジトリ対応）

個人情報（電話番号・メール・学籍番号）は **AES-256-GCM で暗号化した状態でのみリポジトリにコミット**されるため、リポジトリを Public にしても連絡先データは読めません。

```
data/private/members.json    ← 平文の名簿（gitignore済み・コミットされない）
data/private/partners.json   ← 平文の協力先（gitignore済み・コミットされない）
        │  npm run encrypt-data（鍵 = MEMBERS_PASSWORD）
        ▼
data/members.enc.json        ← 暗号文（これだけコミットする）
data/partners.enc.json       ← 暗号文（これだけコミットする）
```

- `/members`・`/contacts` ページは、サーバー側で `MEMBERS_PASSWORD` を鍵に復号して表示する（閲覧合言葉と復号鍵は同じ値）
- **名簿・協力先を編集する手順**：`data/private/*.json` を編集 → `npm run encrypt-data` → 生成された `*.enc.json` をコミット
- **パスワードを変更したら**：`.env.local` と Vercel の環境変数を更新し、`npm run encrypt-data` で再暗号化してコミット
- `data/private/` を持っていない役員（clone したばかり等）は、合言葉を `.env.local` に設定して `npm run decrypt-data` を実行すると、暗号文から平文を復元して編集を始められる
- 注意：万一 平文の JSON を一度でも push してしまった場合は、履歴に残るため「ファイルを消して push し直す」だけでは不十分。git 履歴の書き換え（git filter-repo など）と合言葉の変更を行うこと
- 公開ページに載せている部長メールアドレス（お問い合わせ窓口）は意図的に公開している情報。窓口を変えたい場合は components/footer.tsx・app/donate・app/for-partners を編集
