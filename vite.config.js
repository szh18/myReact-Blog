import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function rssPlugin(options) {
  return {
    name: 'generate-rss',
    apply: 'build',
    closeBundle() {
      const contentDir = path.resolve(__dirname, 'content');
      if (!fs.existsSync(contentDir)) return;

      const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
      const posts = files
        .map(file => {
          const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
          const { data } = matter(raw);
          return {
            slug: file.replace('.md', ''),
            title: data.title || file.replace('.md', ''),
            date: data.date
              ? (() => {
                  const d = data.date instanceof Date ? data.date : new Date(data.date + 'T00:00:00Z');
                  return d instanceof Date && !isNaN(d) ? d.toUTCString() : null;
                })()
              : null,
            category: data.category || '未分类',
            excerpt: data.excerpt || '',
          };
        })
        .filter(p => p.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const siteUrl = options.siteUrl.replace(/\/$/, '');
      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${options.title}</title>
  <link>${siteUrl}</link>
  <description>${options.description}</description>
  <language>zh-CN</language>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  ${posts
    .map(
      post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${siteUrl}/post/${post.slug}</link>
    <guid isPermaLink="true">${siteUrl}/post/${post.slug}</guid>
    <pubDate>${post.date}</pubDate>
    <category><![CDATA[${post.category}]]></category>
    <description><![CDATA[${post.excerpt}]]></description>
  </item>`
    )
    .join('')}
</channel>
</rss>`;

      fs.writeFileSync(path.resolve(__dirname, 'dist', 'rss.xml'), rss.trim());
      console.log('[rss] Generated rss.xml with', posts.length, 'posts');
    },
  };
}

export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [
    react(),
    rssPlugin({
      title: 'My Blog',
      siteUrl: process.env.VITE_SITE_URL || 'http://localhost:5173',
      description: '一个基于 React + Vite 构建的个人博客',
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
