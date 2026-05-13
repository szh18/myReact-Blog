import { useParams } from 'react-router-dom';
import { getPostsByTag } from '../utils/posts';
import ArticleCard from '../components/ArticleCard';

function TagPage() {
  const { tag } = useParams();
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="page-container">
      <h2>标签：{decodedTag}</h2>
      {posts.length === 0 ? (
        <p>该标签下暂无文章。</p>
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

export default TagPage;
