import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="搜索文章..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">搜索</button>
    </form>
  );
}

export default SearchBar;
