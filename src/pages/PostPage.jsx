import { useParams, Navigate } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts';
import MarkdownRenderer from '../components/MarkdownRenderer';
import GiscusComments from '../components/GiscusComments';
import TagBadge from '../components/TagBadge';

function PostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <article className="post-page">
      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          {post.date && (
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
          )}
          <TagBadge tag={post.category} type="category" />
        </div>
        <div className="post-tags">
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} type="tag" />
          ))}
        </div>
      </header>
      <MarkdownRenderer content={post.content} />
      <GiscusComments />
    </article>
  );
}

export default PostPage;
