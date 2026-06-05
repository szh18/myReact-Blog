# My Blog — 项目开发指南

## 项目简介

基于 **React 19 + Vite 7** 构建的 Markdown 驱动个人博客。所有文章以 `.md` 文件存放在 `content/` 目录，构建时通过 `gray-matter` 解析 frontmatter，`react-markdown` 渲染正文。支持分类、标签、全文搜索、分页、RSS 订阅。

- **线上地址**：[myreact-blog.vercel.app](https://myreact-blog.vercel.app)
- **技术栈**：React 19 / Vite 7 / React Router 7 / Markdown

---

## 快速开始

### 环境要求

| 工具 | 版本 |
|------|------|
| Node.js | ≥ 22 |
| npm | ≥ 10 |

推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node 版本：

```bash
nvm use 22
```

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/szh18/myReact-Blog.git
cd myReact-Blog

# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建产物
npm run preview

# 运行测试
npm test

# 监听模式运行测试
npm run test:watch

# 代码检查
npm run lint
```

---

## 项目结构

```
myReact/
├── content/                  # 📝 文章存放目录（Markdown 文件）
│   ├── hello-world.md
│   ├── getting-started.md
│   └── ...
│
├── src/
│   ├── main.jsx              # 🚀 应用入口
│   ├── polyfills.js          # 浏览器 polyfill（Buffer 等）
│   ├── App.jsx               # 根布局（Header + Outlet + Footer）
│   ├── App.css               # 布局样式
│   ├── index.css             # 全局样式 + 主题变量
│   ├── config.js             # 站点配置（标题、分页数等）
│   │
│   ├── router/
│   │   └── index.jsx         # 路由定义（React Router v7）
│   │
│   ├── pages/                # 📄 页面组件
│   │   ├── HomePage.jsx      # 首页（文章列表 + 分页）
│   │   ├── PostPage.jsx      # 文章详情页
│   │   ├── CategoryPage.jsx  # 分类聚合页
│   │   ├── TagPage.jsx       # 标签聚合页
│   │   ├── SearchPage.jsx    # 搜索结果页
│   │   └── NotFoundPage.jsx  # 404 页面
│   │
│   ├── components/           # 🧩 通用组件
│   │   ├── Header.jsx        # 顶部导航 + 搜索框
│   │   ├── ArticleCard.jsx   # 文章卡片
│   │   ├── MarkdownRenderer.jsx  # Markdown → HTML 渲染
│   │   ├── Pagination.jsx    # 分页器
│   │   ├── SearchBar.jsx     # 搜索输入框
│   │   └── TagBadge.jsx      # 分类/标签徽章
│   │
│   ├── hooks/
│   │   └── useSearch.js      # 全文搜索 Hook（基于 Fuse.js）
│   │
│   ├── utils/
│   │   └── posts.js          # 文章数据层：解析、查询、分页
│   │
│   └── test/
│       └── setup.js          # 测试环境配置
│
├── public/                   # 静态资源（直接复制到 dist）
│   └── 404.html
│
├── vite.config.js            # Vite 配置 + RSS 插件
├── vercel.json               # Vercel 部署配置
├── eslint.config.js          # ESLint 规则
├── package.json
└── PROJECT_GUIDE.md          # 📖 本文件
```

---

## 核心架构

### 文章数据流

```
content/*.md  ──→  gray-matter 解析  ──→  utils/posts.js  ──→  页面组件
    (文件系统)      (frontmatter + 正文)     (缓存 + 查询 API)     (渲染)
```

整个流程在 **构建时**完成（`import.meta.glob` 静态导入），无运行时请求：

1. `vite.config.js` 中配置 `import.meta.glob('/content/*.md', { eager: true })`，构建时将所有 `.md` 文件内容内联到 bundle
2. `utils/posts.js` 用 `gray-matter` 解析每篇文章的 frontmatter 和正文
3. 提供 `getAllPosts()` / `getPostBySlug()` / `getPostsByCategory()` 等查询函数
4. 页面组件直接调用这些函数获取数据

### 路由设计

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | 首页，文章列表 + 分页 |
| `/page/:pageNum` | HomePage | 分页（每页 5 篇） |
| `/post/:slug` | PostPage | 文章详情 |
| `/category/:category` | CategoryPage | 按分类过滤 |
| `/tag/:tag` | TagPage | 按标签过滤 |
| `/search?q=xxx` | SearchPage | 全文搜索 |
| `*` | NotFoundPage | 404 |

路由使用 `createBrowserRouter`（React Router v7），自动从 `BASE_URL` 环境变量读取 base path。

### 搜索实现

使用 [Fuse.js](https://fusejs.io/) 模糊搜索库，对标题、正文、分类、标签、摘要五个字段建索引，阈值 0.4。搜索结果按匹配度排序。

---

## 如何写文章

在 `content/` 目录下新建 `.md` 文件，按以下格式编写：

```markdown
---
title: 文章标题
date: 2026-06-05
category: 技术
tags:
  - React
  - JavaScript
  - 前端
excerpt: 一句话摘要（可选，不填则自动截取正文前 200 字）
---

## 正文标题

正文内容（Markdown 格式，支持 GFM 表格、代码高亮等）...
```

**规则**：
- 文件名 = 文章 slug（URL 标识符），如 `my-article.md` → `/post/my-article`
- `date` 格式为 `YYYY-MM-DD`
- `tags` 是数组，`category` 是单个字符串
- 支持 GFM 扩展语法（表格、任务列表、删除线等）
- 代码块自动语法高亮（通过 highlight.js）

保存后 `npm run dev` 即可在本地预览；推送到 `main` 分支会自动部署到 Vercel。

---

## 主题定制

### 配色变量

全局配色定义在 [src/index.css](src/index.css) 的 `:root` 选择器中，按需修改：

```css
:root {
  --color-primary: #2563eb;      /* 主色调 */
  --color-bg: #f0f4ff;           /* 背景色 */
  --color-card-bg: #ffffff;      /* 卡片背景 */
  --color-text: #1e293b;         /* 正文颜色 */
  /* ... */
}
```

### 站点配置

修改 [src/config.js](src/config.js)：

```js
const config = {
  siteTitle: 'My Blog',           // 站点标题
  siteDescription: '...',         // SEO 描述
  siteUrl: '...',                 // 站点 URL
  postsPerPage: 5,                // 每页文章数
};
```

---

## 部署

### Vercel（当前方案）

推送到 `main` 分支自动部署，配置文件 [vercel.json](vercel.json) 已包含 SPA 路由重写规则和缓存策略。

手动部署：
```bash
npx vercel --prod --scope szh18s-projects
```

### GitHub Pages（备用方案）

GitHub Actions 工作流位于 `.github/workflows/deploy.yml`，Source 需选择 **GitHub Actions**。但 `github.io` 域名在国内访问受限，仅作备用。

---

## 依赖说明

| 包名 | 用途 |
|------|------|
| `react` / `react-dom` | UI 框架（v19） |
| `react-router-dom` | 客户端路由（v7） |
| `react-markdown` | Markdown → React 组件 |
| `remark-gfm` | GFM 扩展（表格、任务列表等） |
| `rehype-highlight` | 代码语法高亮 |
| `highlight.js` | 高亮主题（CSS） |
| `gray-matter` | Markdown frontmatter 解析 |
| `fuse.js` | 模糊搜索 |
| `buffer` | Node.js Buffer 的浏览器 polyfill（gray-matter 依赖） |
| `vite` | 构建工具（v7） |
| `@vitejs/plugin-react` | Vite React 插件 |
| `vitest` | 单元测试框架 |
| `@testing-library/react` | React 组件测试 |
| `jsdom` | 测试用浏览器环境模拟 |
| `eslint` | 代码规范检查 |

---

## 常见问题

### gray-matter 在浏览器报 Buffer 未定义

`gray-matter` 是 Node.js 库，浏览器没有 `Buffer` 全局变量。解决方案：

1. 安装 `buffer` polyfill：`npm install buffer`
2. 在 [src/polyfills.js](src/polyfills.js) 中导入：
   ```js
   import { Buffer } from 'buffer';
   window.Buffer = Buffer;
   ```
3. 在入口文件 `main.jsx` **最顶部**导入 polyfills

### 部署后 404 刷新

SPA 路由需要服务端把所有路径重写到 `index.html`。Vercel 配置（vercel.json 中的 `rewrites`）已处理，其他平台需配置相应规则。

### RSS 不更新

RSS 在 `vite build` 时通过自定义插件生成，路径为 `dist/rss.xml`。只执行 `npm run dev` 不会生成 RSS。

---

## 待办 / 改进方向

- [ ] TypeScript 迁移
- [ ] 图片支持（文章内引用图片）
- [ ] 暗色模式切换
- [ ] 评论系统（Giscus / Waline）
- [ ] 文章目录（TOC）
- [ ] SEO meta 标签优化（react-helmet）
- [ ] 代码分割优化（当前 JS bundle ~790KB）
