import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { getAllPosts } from '../utils/posts';

const fuseOptions = {
  keys: ['title', 'content', 'category', 'tags', 'excerpt'],
  threshold: 0.4,
  includeScore: true,
};

export function useSearch(query) {
  const posts = useMemo(() => getAllPosts(), []);

  return useMemo(() => {
    if (!query || !query.trim()) return [];
    const fuse = new Fuse(posts, fuseOptions);
    return fuse.search(query.trim());
  }, [query, posts]);
}
