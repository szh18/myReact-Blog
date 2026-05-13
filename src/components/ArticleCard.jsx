import { Link } from 'react-router-dom';
import TagBadge from './TagBadge';

function ArticleCard({ post }) {
  return (
    <article className="article-card">
      <h2>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <div className="article-meta">
        {post.date && (
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </time>
        )}
        <Link to={`/category/${encodeURIComponent(post.category)}`}>
          {post.category}
        </Link>
      </div>
      <p className="article-excerpt">{post.excerpt}</p>
      <div className="article-tags">
        {post.tags.map(tag => (
          <TagBadge key={tag} tag={tag} type="tag" />
        ))}
      </div>
    </article>
  );
}

export default ArticleCard;
