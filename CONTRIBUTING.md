# 部員向け編集ガイド（CONTRIBUTING.md）

このサイトは、プログラミングの知識がなくても **ファイルを編集するだけ** で更新できるように作られています。
更新は GitHub の Web 画面（スマホでも可）か、パソコンのエディタ（VS Code など）で行います。

## いちばんよくある作業：活動レポートを書く

1. `content/activities/` フォルダを開く
2. 既存のファイルをコピーして、ファイル名を `日付-活動名.mdx` にする
   - 例：`2026-05-10-johoku-salon.mdx`（半角英数字・ハイフン区切り）
3. 中身を書き換える：

```mdx
---
title: 城北団地サロン 5月回
date: "2026-05-10"
category: senior
emoji: "🌻"
excerpt: 一覧に表示される1行の要約をここに書く。
---

ここから本文。普通の文章で OK です。絵文字もそのまま使えます☺️

## 見出しはシャープ2つ

- 箇条書きはハイフン

![活動の様子](/images/activities/2026-05-10-johoku.jpg)
```

4. 保存（GitHub なら「Commit changes」）→ 1〜2分で自動的にサイトに反映

### category に使える値

| 値 | 意味 |
|---|---|
| `senior` | 高齢者サロン 🌻 |
| `kids` | 子ども支援 🎈 |
| `down` | ダウン症児支援 😊 |
| `community` | 地域交流 🤝 |
| `external` | 学外イベント 🌏 |

新しいカテゴリを増やしたいときは `lib/categories.ts` に1ブロック追加します（分からなければ IT 係へ）。

## 写真の追加方法

1. 写真のファイルサイズを縮小する（スマホの共有機能や https://squoosh.app で 500KB 以下推奨）
2. `public/images/activities/` にアップロード（ファイル名は半角英数字：`2026-05-10-johoku.jpg`）
3. MDX 本文から `![説明文](/images/activities/2026-05-10-johoku.jpg)` で表示

⚠️ **写真の注意**：参加者（特に子ども）の顔が写っている写真は、掲載許可を得たものだけを使うこと。

## データの編集（JSON ファイル）

`data/` フォルダの JSON を編集します。**カンマの付け忘れ・全角の `"` に注意**（保存前に https://jsonlint.com で確認すると安心）。

- **予定イベントの追加** → `data/events.json` の `"special": [...]` の中に1件コピーして追加
- **定例活動の変更** → `data/events.json` の `"regular"`。開催ルールは
  `{"type":"weekly","weekday":3}`（毎週水曜）や `{"type":"monthly-weekday","week":1,"weekday":0}`（毎月第1日曜）のように書く（weekday は 0=日〜6=土）
- **表彰・助成金の追加** → `data/awards.json` に1件追加
- **準備物リストの更新** → `data/checklists.json`（`items` が持ち物、`flow` が当日の流れ）

### ⚠ 名簿・連絡先の編集（役員のみ・特別な手順）

部員名簿と地域交流先は個人情報のため、**暗号化した状態でしかリポジトリに置けません**。編集はパソコンで行います：

1. 役員から平文データ（`data/private/members.json`・`data/private/partners.json`）を受け取り、`data/private/` に置く（このフォルダは gitignore されておりコミットされない）
2. `data/private/*.json` を編集する
3. `npm run encrypt-data` を実行（`.env.local` の `MEMBERS_PASSWORD` が鍵になる）
4. 生成された `data/members.enc.json`・`data/partners.enc.json` **だけ**をコミットする

🚫 `data/private/` の中身を GitHub にアップロードするのは絶対に禁止。間違えて push してしまったら、すぐ部長と IT 係に連絡（履歴の削除と合言葉の変更が必要）。

## 固定ページの本文（理念・活動の原点）

- 理念 → `content/pages/philosophy.mdx`
- 活動の原点 → `content/pages/origin.mdx`

現在は**仮置きの文章**が入っています。部内で内容を確定したら書き換えてください。

## GitHub での編集手順（スマホ可）

1. GitHub にログインし、このリポジトリを開く（権限がない人は部長に招待してもらう）
2. 編集したいファイルを開き、鉛筆アイコン（Edit）を押す
3. 編集して「Commit changes」→ そのまま main に commit で OK
4. 1〜2分後、Vercel が自動でサイトを更新

大きな変更（デザイン・ページ追加など）は Pull Request にして、IT 係のレビューを通すことを推奨します。

## パソコンで動作確認したい場合

```bash
npm install      # 初回のみ
npm run dev      # http://localhost:3000 で確認
npm run build    # 公開前のエラーチェック
```

## 困ったとき

- ビルドエラーで公開されない → Vercel の Deployments 画面のログを見る。だいたい JSON のカンマ忘れか MDX の frontmatter（`---` の間）の書式ミス
- 分からないことがあれば部内 IT 係 or 部長（森一真）まで
