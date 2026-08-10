// サーバー専用：暗号化された個人情報データ（data/*.enc.json）の復号
// 鍵は閲覧ゲートと同じ MEMBERS_PASSWORD。クライアントコンポーネントから import しないこと。
import fs from "fs";
import path from "path";
import crypto from "crypto";

interface EncryptedFile {
  version: number;
  salt: string;
  iv: string;
  tag: string;
  ciphertext: string;
}

export interface Officer {
  role: string;
  name: string;
  studentId: string;
  phone: string;
  email: string;
}

export interface MembersData {
  asOf: string;
  totalCount: number;
  note: string;
  officers: Officer[];
  groupLeaders: { group: string; name: string }[];
  advisor: { name: string; affiliation: string; email: string };
  alumni: string[];
  members: { studentId: string; name: string; joined: string; faculty: string }[];
}

export interface Partner {
  name: string;
  contact: string;
  phone: string;
  category: string;
  activity: string;
}

function decryptFile<T>(name: string): T | null {
  try {
    const file = path.join(process.cwd(), "data", `${name}.enc.json`);
    const enc = JSON.parse(fs.readFileSync(file, "utf-8")) as EncryptedFile;
    const password = process.env.MEMBERS_PASSWORD ?? "scs2022";
    const key = crypto.scryptSync(password, Buffer.from(enc.salt, "base64"), 32);
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(enc.iv, "base64")
    );
    decipher.setAuthTag(Buffer.from(enc.tag, "base64"));
    const dec = Buffer.concat([
      decipher.update(Buffer.from(enc.ciphertext, "base64")),
      decipher.final(),
    ]);
    return JSON.parse(dec.toString("utf-8")) as T;
  } catch {
    // ファイル欠落・パスワード不一致（= 暗号化時と env が異なる）はいずれも null
    return null;
  }
}

export function getMembersData(): MembersData | null {
  return decryptFile<MembersData>("members");
}

export function getPartnersData(): Partner[] | null {
  return decryptFile<Partner[]>("partners");
}
