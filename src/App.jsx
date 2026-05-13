import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>
          <Link to="/">My Blog</Link> &copy; {new Date().getFullYear()}
          &nbsp;·&nbsp;
          <Link to="/">首页</Link>
          &nbsp;·&nbsp;
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS 订阅</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
