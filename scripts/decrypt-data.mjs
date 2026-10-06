/**
 * 暗号化データの復元スクリプト（encrypt-data.mjs の逆）
 *
 * data/members.enc.json / data/partners.enc.json を復号して
 * data/private/members.json / data/private/partners.json（平文・gitignore対象）を再生成する。
 *
 * クローンしたばかりで data/private/ が無い役員が、名簿編集を始める時に使う:
 *
 *   npm run decrypt-data
 *
 * 鍵は encrypt-data.mjs と同じく MEMBERS_PASSWORD（環境変数 → .env.local → 開発用デフォルト）。
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
  return { password: "scs2022", source: "開発用デフォルト" };
}

function decrypt(enc, password) {
  const key = crypto.scryptSync(password, Buffer.from(enc.salt, "base64"), 32);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(enc.iv, "base64"));
  decipher.setAuthTag(Buffer.from(enc.tag, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(enc.ciphertext, "base64")),
    decipher.final(),
  ]).toString("utf-8");
}

const { password, source } = loadPassword();
fs.mkdirSync(privateDir, { recursive: true });

for (const name of ["members", "partners"]) {
  const src = path.join(root, "data", `${name}.enc.json`);
  if (!fs.existsSync(src)) {
    console.error(`⚠ スキップ: data/${name}.enc.json がありません`);
    continue;
  }
  const out = path.join(privateDir, `${name}.json`);
  if (fs.existsSync(out)) {
    console.error(`⚠ スキップ: data/private/${name}.json は既に存在します（上書きしません）`);
    continue;
  }
  try {
    const plain = decrypt(JSON.parse(fs.readFileSync(src, "utf-8")), password);
    fs.writeFileSync(out, plain.endsWith("\n") ? plain : plain + "\n");
    console.log(`✓ data/${name}.enc.json → data/private/${name}.json`);
  } catch {
    console.error(`✗ ${name} の復号に失敗。鍵（${source}）が暗号化時のパスワードと一致していません`);
    process.exitCode = 1;
  }
}
