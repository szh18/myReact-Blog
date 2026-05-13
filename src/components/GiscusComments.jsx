import Giscus from '@giscus/react';
import config from '../config';

function GiscusComments() {
  if (!config.giscus.repo) {
    return (
      <p className="comments-placeholder">
        评论功能尚未配置。请设置 VITE_GISCUS_* 环境变量。
      </p>
    );
  }

  return (
    <div className="comments-section">
      <Giscus
        repo={config.giscus.repo}
        repoId={config.giscus.repoId}
        category={config.giscus.category}
        categoryId={config.giscus.categoryId}
        mapping={config.giscus.mapping}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={config.giscus.theme}
        lang="zh-CN"
      />
    </div>
  );
}

export default GiscusComments;
