import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import PostPage from '../pages/PostPage';
import CategoryPage from '../pages/CategoryPage';
import TagPage from '../pages/TagPage';
import SearchPage from '../pages/SearchPage';
import NotFoundPage from '../pages/NotFoundPage';

const basename = import.meta.env.BASE_URL
  ? import.meta.env.BASE_URL.replace(/\/$/, '')
  : '/';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'page/:pageNum', element: <HomePage /> },
        { path: 'post/:slug', element: <PostPage /> },
        { path: 'category/:category', element: <CategoryPage /> },
        { path: 'tag/:tag', element: <TagPage /> },
        { path: 'search', element: <SearchPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename }
);

export default router;
