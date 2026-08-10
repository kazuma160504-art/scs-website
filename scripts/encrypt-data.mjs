/**
 * 個人情報データの暗号化スクリプト
 *
 * data/private/members.json と data/private/partners.json（平文・gitignore対象）を
 * AES-256-GCM で暗号化し、data/members.enc.json / data/partners.enc.json（コミット対象）を生成する。
 *
 * 鍵は MEMBERS_PASSWORD（環境変数 → .env.local → 開発用デフォルトの順で解決）。
 * サイト側は同じパスワードで復号するため、パスワードを変更したら必ず再実行すること:
 *
 *   npm run encrypt-data
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const privateDir = path.join(root, "data", "private");

function loadPassword() {
  if (process.env.MEMBERS_PASSWORD) {
    return { password: process.env.MEMBERS_PASSWORD, source: "環境変数 MEMBERS_PASSWORD" };
  }
  for (const f of [".env.local", ".env"]) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) {
      const m = fs.readFileSync(p, "utf-8").match(/^MEMBERS_PASSWORD=(.+)$/m);
      if (m) return { password: m[1].trim(), source: f };
    }
  }
  return { password: "scs2022", source: "開発用デフォルト（本番では必ず変更すること）" };
}

function encrypt(obj, password) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(JSON.stringify(obj, null, 2), "utf-8"), cipher.final()]);
  return {
    version: 1,
    algorithm: "aes-256-gcm",
    kdf: "scrypt",
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ciphertext: enc.toString("base64"),
  };
}

const { password, source } = loadPassword();
let ok = 0;

for (const name of ["members", "partners"]) {
  const src = path.join(privateDir, `${name}.json`);
  if (!fs.existsSync(src)) {
    console.error(`⚠ スキップ: ${path.relative(root, src)} がありません`);
    continue;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(src, "utf-8"));
  } catch (e) {
    console.error(`✗ ${name}.json の JSON が壊れています: ${e.message}`);
    process.exitCode = 1;
    continue;
  }
  const out = path.join(root, "data", `${name}.enc.json`);
  fs.writeFileSync(out, JSON.stringify(encrypt(data, password), null, 2) + "\n");
  console.log(`✓ data/private/${name}.json → data/${name}.enc.json`);
  ok++;
}

console.log(`\n鍵の取得元: ${source}`);
if (ok > 0) {
  console.log("生成された *.enc.json をコミットしてください（data/private/ は絶対にコミットしないこと）");
}
