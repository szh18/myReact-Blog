import matter from 'gray-matter';

const mdModules = import.meta.glob('/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

let _parsedCache = null;

function parseAllPosts() {
  if (_parsedCache) return _parsedCache;

  _parsedCache = Object.entries(mdModules)
    .map(([filepath, rawContent]) => {
      const { data, content } = matter(rawContent);
      const slug = filepath.replace('/content/', '').replace(/\.md$/, '');
      return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString() : null,
        category: data.category || '未分类',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || content.slice(0, 200).replace(/\n/g, ' ') + '...',
        content,
      };
    })
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

  return _parsedCache;
}

export function getAllPosts() {
  return parseAllPosts();
}

export function getPostBySlug(slug) {
  return parseAllPosts().find(p => p.slug === slug);
}

export function getAllCategories() {
  return [...new Set(parseAllPosts().map(p => p.category))];
}

export function getAllTags() {
  return [...new Set(parseAllPosts().flatMap(p => p.tags))];
}

export function getPostsByCategory(category) {
  return parseAllPosts().filter(p => p.category === category);
}

export function getPostsByTag(tag) {
  return parseAllPosts().filter(p => p.tags.includes(tag));
}

export function getPaginatedPosts(page = 1, perPage = 5) {
  const all = parseAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * perPage;
  return {
    posts: all.slice(start, start + perPage),
    totalPages,
    currentPage: safePage,
    totalPosts: all.length,
  };
}
