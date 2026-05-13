import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('只有1页时不渲染任何内容', () => {
    const { container } = render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={1} />
      </MemoryRouter>
    );
    expect(container.querySelector('.pagination')).toBeNull();
  });

  it('应该渲染正确的页码', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('应该高亮当前页', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('2').className).toContain('active');
  });

  it('第一页不应显示上一页链接', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={1} totalPages={3} />
      </MemoryRouter>
    );
    expect(screen.queryByText('上一页')).toBeNull();
  });

  it('最后一页不应显示下一页链接', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={3} totalPages={3} />
      </MemoryRouter>
    );
    expect(screen.queryByText('下一页')).toBeNull();
  });

  it('第一页的页码应链接到首页', () => {
    render(
      <MemoryRouter>
        <Pagination currentPage={2} totalPages={3} />
      </MemoryRouter>
    );
    expect(screen.getByText('1').closest('a')).toHaveAttribute('href', '/');
  });
});
