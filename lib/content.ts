import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { CategoryKey } from "./categories";

const contentDir = path.join(process.cwd(), "content");

export interface ActivityMeta {
  slug: string;
  title: string;
  date: string; // yyyy-mm-dd
  category: CategoryKey;
  excerpt: string;
  emoji?: string;
  image?: string;
}

export interface Activity extends ActivityMeta {
  content: string;
}

function readMdxDir(dir: string): { file: string; raw: string }[] {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => ({
      file,
      raw: fs.readFileSync(path.join(full, file), "utf-8"),
    }));
}

/** content/activities/*.mdx を新しい順に返す */
export function getActivities(): Activity[] {
  return readMdxDir("activities")
    .map(({ file, raw }) => {
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: data.title ?? file,
        date: data.date ?? "",
        category: (data.category ?? "community") as CategoryKey,
        excerpt: data.excerpt ?? "",
        emoji: data.emoji,
        image: data.image,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getActivity(slug: string): Activity | undefined {
  return getActivities().find((a) => a.slug === slug);
}

/** content/pages/<slug>.mdx（理念・原点などの固定ページ） */
export function getPage(slug: string): { data: Record<string, any>; content: string } | null {
  const file = path.join(contentDir, "pages", `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return { data, content };
}
