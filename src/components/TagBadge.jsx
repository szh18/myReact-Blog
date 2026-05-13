import { Link } from 'react-router-dom';

function TagBadge({ tag, type = 'tag' }) {
  return (
    <Link
      to={`/${type}/${encodeURIComponent(tag)}`}
      className={`badge badge-${type}`}
    >
      {tag}
    </Link>
  );
}

export default TagBadge;
