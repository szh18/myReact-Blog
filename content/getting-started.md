---
title: 快速上手 — 如何写一篇新文章
date: 2026-05-10
category: 教程
tags:
  - Markdown
  - 教程
excerpt: 学习如何在博客中添加新文章，了解 frontmatter 的用法。
---

## 快速上手

写一篇新文章非常简单，只需要在 `content/` 目录下创建一个新的 `.md` 文件。

### Frontmatter

每篇文章开头需要包含 YAML frontmatter：

```yaml
---
title: 文章标题
date: 2026-05-10
category: 分类名称
tags:
  - 标签1
  - 标签2
excerpt: 文章摘要（可选）
---
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 否 | 发布日期，格式 YYYY-MM-DD |
| `category` | 否 | 文章分类，默认为 "未分类" |
| `tags` | 否 | 标签列表 |
| `excerpt` | 否 | 摘要，不填则自动截取正文前 200 字 |

### Markdown 支持

支持标准 Markdown 语法和 GFM 扩展：

- **加粗** 和 *斜体*
- 有序列表和无序列表
- 代码块（带语法高亮）
- 表格
- 链接和图片
- 引用块

### 部署

文章写完 push 到 GitHub 后，GitHub Actions 会自动构建并部署到 GitHub Pages。
