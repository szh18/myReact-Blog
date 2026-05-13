import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MarkdownRenderer from '../MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('应该渲染加粗文本', () => {
    render(<MarkdownRenderer content="Hello **World**" />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('应该渲染标题', () => {
    render(<MarkdownRenderer content="# 你好" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('你好');
  });

  it('应该渲染代码块', () => {
    render(<MarkdownRenderer content="```js\nconst x = 1;\n```" />);
    expect(screen.getByText(/const x/)).toBeInTheDocument();
  });

  it('应该渲染普通段落', () => {
    render(<MarkdownRenderer content="普通文本" />);
    expect(screen.getByText('普通文本')).toBeInTheDocument();
  });
});
