import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../utils/posts';
import SearchBar from './SearchBar';
import config from '../config';

function Header() {
  const categories = getAllCategories();

  return (
    <header className="app-header">
      <div className="header-top">
        <h1><NavLink to="/">{config.siteTitle}</NavLink></h1>
        <SearchBar />
      </div>
      <nav className="nav-menu">
        <NavLink to="/" end>首页</NavLink>
        {categories.map(cat => (
          <NavLink key={cat} to={`/category/${encodeURIComponent(cat)}`}>
            {cat}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
