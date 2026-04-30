import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const insightsDirectory = path.join(process.cwd(), 'content', 'insights');

export interface InsightMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  featured: boolean;
  seoDescription: string;
}

export interface Insight extends InsightMeta {
  contentHtml: string;
}

export function getAllInsights(): InsightMeta[] {
  if (!fs.existsSync(insightsDirectory)) return [];
  
  const fileNames = fs.readdirSync(insightsDirectory);
  const allInsights = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(insightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        subtitle: data.subtitle || '',
        date: data.date || '',
        author: data.author || 'Hector Garcia',
        readTime: data.readTime || '5 min read',
        category: data.category || 'General',
        featured: data.featured || false,
        seoDescription: data.seoDescription || '',
      } as InsightMeta;
    });

  return allInsights.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  try {
    const fullPath = path.join(insightsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      date: data.date || '',
      author: data.author || 'Hector Garcia',
      readTime: data.readTime || '5 min read',
      category: data.category || 'General',
      featured: data.featured || false,
      seoDescription: data.seoDescription || '',
      contentHtml,
    };
  } catch {
    return null;
  }
}

export function getAllInsightSlugs(): string[] {
  if (!fs.existsSync(insightsDirectory)) return [];
  return fs.readdirSync(insightsDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}
