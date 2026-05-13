import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ArticleCard from '../ArticleCard';

const mockPost = {
  slug: 'test-post',
  title: '测试文章',
  date: '2026-05-01T00:00:00.000Z',
  category: '技术',
  tags: ['React', 'Vite'],
  excerpt: '这是一篇测试文章的摘要...',
  content: '# 测试\n内容',
};

describe('ArticleCard', () => {
  it('应该渲染文章标题', () => {
    render(
      <MemoryRouter>
        <ArticleCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText('测试文章')).toBeInTheDocument();
  });

  it('应该渲染文章摘要', () => {
    render(
      <MemoryRouter>
        <ArticleCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText('这是一篇测试文章的摘要...')).toBeInTheDocument();
  });

  it('应该渲染分类', () => {
    render(
      <MemoryRouter>
        <ArticleCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getAllByText('技术').length).toBeGreaterThan(0);
  });

  it('应该渲染所有标签', () => {
    render(
      <MemoryRouter>
        <ArticleCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('标题应该链接到文章详情页', () => {
    render(
      <MemoryRouter>
        <ArticleCard post={mockPost} />
      </MemoryRouter>
    );
    const link = screen.getByText('测试文章').closest('a');
    expect(link).toHaveAttribute('href', '/post/test-post');
  });
});
