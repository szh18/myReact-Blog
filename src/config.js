const config = {
  siteTitle: 'My Blog',
  siteDescription: '一个基于 React + Vite 构建的个人博客',
  siteUrl: import.meta.env.PROD
    ? (import.meta.env.VITE_SITE_URL || 'https://szh.github.io/myReact')
    : 'http://localhost:5173',

  postsPerPage: 5,
};

export default config;
