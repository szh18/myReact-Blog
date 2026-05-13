const config = {
  siteTitle: 'My Blog',
  siteDescription: '一个基于 React + Vite 构建的个人博客',
  siteUrl: import.meta.env.PROD
    ? (import.meta.env.VITE_SITE_URL || 'https://szh.github.io/myReact')
    : 'http://localhost:5173',

  postsPerPage: 5,

  giscus: {
    repo: import.meta.env.VITE_GISCUS_REPO || '',
    repoId: import.meta.env.VITE_GISCUS_REPO_ID || '',
    category: import.meta.env.VITE_GISCUS_CATEGORY || 'Announcements',
    categoryId: import.meta.env.VITE_GISCUS_CATEGORY_ID || '',
    mapping: 'pathname',
    theme: 'light',
  },
};

export default config;
