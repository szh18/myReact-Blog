import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../SearchBar';

// Wrapper that provides a Router context for SearchBar
function TestWrapper() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <SearchBar />
    </MemoryRouter>
  );
}

describe('SearchBar', () => {
  it('应该渲染搜索输入框和按钮', () => {
    render(<TestWrapper />);
    expect(screen.getByPlaceholderText('搜索文章...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '搜索' })).toBeInTheDocument();
  });

  it('应该允许输入搜索关键词', async () => {
    const user = userEvent.setup();
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText('搜索文章...');
    await user.type(input, 'React');
    expect(input).toHaveValue('React');
  });
});
