import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import ArticleCard from '../components/ArticleCard';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = useSearch(query);

  return (
    <div className="search-page">
      <h2>搜索结果</h2>
      {query ? (
        <>
          <p>找到 {results.length} 条与 &ldquo;{query}&rdquo; 相关的结果</p>
          {results.length > 0 ? (
            <div className="post-list">
              {results.map(result => (
                <ArticleCard key={result.item.slug} post={result.item} />
              ))}
            </div>
          ) : (
            <p>未找到匹配的文章。</p>
          )}
        </>
      ) : (
        <p>请输入搜索关键词。</p>
      )}
    </div>
  );
}

export default SearchPage;
