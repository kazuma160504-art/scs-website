"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const COOKIE_NAME = "scs-members-auth";

function expectedPassword() {
  // 本番では必ず環境変数 MEMBERS_PASSWORD を設定すること（Vercel の Environment Variables）
  return process.env.MEMBERS_PASSWORD ?? "scs2022";
}

export async function isAuthed(): Promise<boolean> {
  return cookies().get(COOKIE_NAME)?.value === expectedPassword();
}

export async function login(_prev: { error: string } | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== expectedPassword()) {
    return { error: "合言葉が違います。部長・役員に確認してください。" };
  }
  cookies().set(COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30日
    path: "/",
  });
  revalidatePath("/members");
  revalidatePath("/contacts");
  return null;
}
