import { useParams } from 'react-router-dom';
import { getPaginatedPosts } from '../utils/posts';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import config from '../config';

function HomePage() {
  const { pageNum } = useParams();
  const page = parseInt(pageNum || '1', 10);
  const { posts, totalPages, currentPage } = getPaginatedPosts(page, config.postsPerPage);

  if (posts.length === 0) {
    return (
      <div className="page-container">
        <h2>暂无文章</h2>
        <p>还没有文章发布，请稍后再来。</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="post-list">
        {posts.map(post => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default HomePage;
