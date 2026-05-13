import { Link } from 'react-router-dom';

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination" aria-label="分页导航">
      {currentPage > 1 && (
        <Link to={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}>
          上一页
        </Link>
      )}
      {pages.map(p => (
        <Link
          key={p}
          to={p === 1 ? '/' : `/page/${p}`}
          className={p === currentPage ? 'active' : ''}
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link to={`/page/${currentPage + 1}`}>下一页</Link>
      )}
    </nav>
  );
}

export default Pagination;
