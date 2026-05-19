import { describe, it, expect } from 'vitest';
import {
  getAllPosts,
  getPostBySlug,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
  getPaginatedPosts,
} from '../posts';

describe('posts', () => {
  describe('getAllPosts', () => {
    it('应该返回所有文章并按日期降序排列', () => {
      const posts = getAllPosts();
      expect(posts).toHaveLength(4);
      expect(posts[0].title).toBe('Claude Code 双 Skill 完全指南 — superpowers + gstack 全部技能详解');
      expect(posts[1].title).toBe('Vue 2 与 Vue 3 的核心区别');
      expect(posts[2].title).toBe('快速上手 — 如何写一篇新文章');
      expect(posts[3].title).toBe('Hello World — 我的第一篇博客');
    });
  });

  describe('getPostBySlug', () => {
    it('应该根据 slug 返回文章', () => {
      const post = getPostBySlug('hello-world');
      expect(post).toBeDefined();
      expect(post.title).toBe('Hello World — 我的第一篇博客');
      expect(post.category).toBe('技术');
      expect(post.tags).toContain('React');
    });

    it('不存在的 slug 应返回 undefined', () => {
      expect(getPostBySlug('non-existent')).toBeUndefined();
    });
  });

  describe('getPostsByCategory', () => {
    it('应该按分类筛选文章', () => {
      const posts = getPostsByCategory('技术');
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe('hello-world');
    });

    it('不存在的分类应返回空数组', () => {
      expect(getPostsByCategory('不存在')).toHaveLength(0);
    });
  });

  describe('getPostsByTag', () => {
    it('应该按标签筛选文章', () => {
      const posts = getPostsByTag('React');
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe('hello-world');
    });
  });

  describe('getAllCategories', () => {
    it('应该返回所有不重复的分类', () => {
      const cats = getAllCategories();
      expect(cats).toContain('技术');
      expect(cats).toContain('教程');
      expect(cats).toContain('前端');
      expect(cats).toContain('工具');
    });
  });

  describe('getAllTags', () => {
    it('应该返回所有不重复的标签', () => {
      const tags = getAllTags();
      expect(tags).toContain('React');
      expect(tags).toContain('Vite');
      expect(tags).toContain('Markdown');
      expect(tags).toContain('教程');
      expect(tags).toContain('Vue');
      expect(tags).toContain('Vue3');
      expect(tags).toContain('JavaScript');
      expect(tags).toContain('Claude Code');
      expect(tags).toContain('Skill');
      expect(tags).toContain('gstack');
      expect(tags).toContain('AI编程');
    });
  });

  describe('getPaginatedPosts', () => {
    it('应该返回首页文章', () => {
      const result = getPaginatedPosts(1, 1);
      expect(result.posts).toHaveLength(1);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(4);
      expect(result.totalPosts).toBe(4);
    });

    it('应该将无效页码限制在有效范围内', () => {
      const result = getPaginatedPosts(999, 2);
      expect(result.currentPage).toBe(2);
    });
  });
});
