import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const contentDir = path.join(process.cwd(), "content");

export interface ContentItem {
  slug: string;
  frontmatter: Record<string, unknown>;
  content: string;
  html: string;
}

export function getSettings() {
  const filePath = path.join(contentDir, "settings.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getSingleContent(filename: string): ContentItem {
  const filePath = path.join(contentDir, `${filename}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: filename,
    frontmatter: data,
    content,
    html: "",
  };
}

export async function getSingleContentWithHtml(
  filename: string
): Promise<ContentItem> {
  const item = getSingleContent(filename);
  const result = await remark().use(gfm).use(html).process(item.content);
  return { ...item, html: result.toString() };
}

export function getCollectionSlugs(collection: string): string[] {
  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getCollectionItem(
  collection: string,
  slug: string
): ContentItem {
  const filePath = path.join(contentDir, collection, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, content, html: "" };
}

export async function getCollectionItemWithHtml(
  collection: string,
  slug: string
): Promise<ContentItem> {
  const item = getCollectionItem(collection, slug);
  const result = await remark().use(gfm).use(html).process(item.content);
  return { ...item, html: result.toString() };
}

export function getCollection(collection: string): ContentItem[] {
  const slugs = getCollectionSlugs(collection);
  return slugs.map((slug) => getCollectionItem(collection, slug));
}

export function getCollectionSorted(
  collection: string,
  sortField = "date",
  ascending = false
): ContentItem[] {
  const items = getCollection(collection);
  return items.sort((a, b) => {
    const aVal = a.frontmatter[sortField] as string;
    const bVal = b.frontmatter[sortField] as string;
    if (!aVal || !bVal) return 0;
    const cmp = new Date(aVal).getTime() - new Date(bVal).getTime();
    return ascending ? cmp : -cmp;
  });
}
