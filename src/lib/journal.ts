import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  readTime: string;
  contentHtml: string;
}

export interface JournalSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  readTime: string;
}

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

function listFiles(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter(f => f.endsWith('.md'));
}

export function getAllSlugs(): string[] {
  return listFiles().map(f => f.replace(/\.md$/, ''));
}

export function getPostSummaries(): JournalSummary[] {
  return listFiles().map(file => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || content.trim().split('\n')[0].slice(0, 180),
      cover: data.cover,
      readTime: estimateReadTime(content),
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): JournalPost | null {
  const file = path.join(JOURNAL_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml = marked.parse(content) as string;
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt || '',
    cover: data.cover,
    readTime: estimateReadTime(content),
    contentHtml,
  };
}
