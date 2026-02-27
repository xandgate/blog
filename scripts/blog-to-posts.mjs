#!/usr/bin/env node
/**
 * Sync markdown drafts from notes/blog (or BLOG_SOURCE_PATH) to src/app/blog/posts as MDX.
 * Run: npm run blog:to-posts
 * Reads: notes/blog/drafts/*.md (or env BLOG_SOURCE_PATH, or LOGSEQ_BLOG_PATH)
 * Writes: src/app/blog/posts/<slug>.mdx
 *
 * Draft frontmatter (optional): title, subtitle, summary, publishedAt, tag, image
 * If frontmatter is missing, slug is derived from filename and other fields left empty for you to fill.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const [, front, content] = match;
  const data = {};
  for (const line of front.split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (m) {
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1).replace(/\\"/g, '"');
      data[m[1]] = v;
    }
  }
  return { data, content: content.trim() };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRAFTS_DIR = process.env.BLOG_SOURCE_PATH || process.env.LOGSEQ_BLOG_PATH || path.join(ROOT, "notes", "blog", "drafts");
const POSTS_DIR = path.join(ROOT, "src", "app", "blog", "posts");

function getMdFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn("Drafts dir not found:", dir);
    return [];
  }
  return fs.readdirSync(dir).filter((f) => path.extname(f).toLowerCase() === ".md");
}

function slugFromFile(file) {
  return path.basename(file, path.extname(file));
}

function escapeYamlString(s) {
  if (s == null) return "";
  const str = String(s);
  if (str.includes("\n") || str.includes(":") || str.includes('"') || str.includes("'")) {
    return JSON.stringify(str);
  }
  return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function main() {
  const files = getMdFiles(DRAFTS_DIR);
  if (files.length === 0) {
    console.log("No .md files in", DRAFTS_DIR);
    console.log("Set BLOG_SOURCE_PATH or LOGSEQ_BLOG_PATH to sync from another folder (e.g. Logseq graph).");
    return;
  }

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  for (const file of files) {
    const slug = slugFromFile(file);
    const filePath = path.join(DRAFTS_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);

    const title = data.title || slug.replace(/-/g, " ");
    const publishedAt = data.publishedAt || new Date().toISOString().slice(0, 10);
    const summary = data.summary != null && data.summary !== "" ? data.summary : "Summary for SEO and cards.";

    const lines = [
      `title: ${escapeYamlString(title)}`,
      data.subtitle != null ? `subtitle: ${escapeYamlString(data.subtitle)}` : null,
      `summary: ${escapeYamlString(summary)}`,
      data.image ? `image: "${data.image}"` : null,
      `publishedAt: "${publishedAt}"`,
      data.tag ? `tag: "${data.tag}"` : null,
    ].filter(Boolean);

    const mdxContent = "---\n" + lines.join("\n") + "\n---\n\n" + content.trim() + "\n";

    const outPath = path.join(POSTS_DIR, `${slug}.mdx`);
    fs.writeFileSync(outPath, mdxContent, "utf-8");
    console.log("Wrote", outPath);
  }

  console.log("Done. %d draft(s) → src/app/blog/posts/", files.length);
}

main();
