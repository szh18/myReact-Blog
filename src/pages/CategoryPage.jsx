import { useParams } from 'react-router-dom';
import { getPostsByCategory } from '../utils/posts';
import ArticleCard from '../components/ArticleCard';

function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);

  return (
    <div className="page-container">
      <h2>分类：{decodedCategory}</h2>
      {posts.length === 0 ? (
        <p>该分类下暂无文章。</p>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
