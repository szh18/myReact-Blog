import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TagBadge from '../TagBadge';

describe('TagBadge', () => {
  it('应该渲染标签文本', () => {
    render(
      <MemoryRouter>
        <TagBadge tag="React" type="tag" />
      </MemoryRouter>
    );
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('应该链接到正确的标签路径', () => {
    render(
      <MemoryRouter>
        <TagBadge tag="React" type="tag" />
      </MemoryRouter>
    );
    expect(screen.getByText('React').closest('a')).toHaveAttribute('href', '/tag/React');
  });

  it('分类类型应链接到 category 路径', () => {
    render(
      <MemoryRouter>
        <TagBadge tag="技术" type="category" />
      </MemoryRouter>
    );
    expect(screen.getByText('技术').closest('a')).toHaveAttribute('href', '/category/%E6%8A%80%E6%9C%AF');
  });
});
