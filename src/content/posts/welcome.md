---
title: 欢迎来到狐言乱语（Korikura 主题示例）
description: 这是一篇用于演示 Korikura 主题的示例文章，包含多级标题、代码分组、数学公式与 GitHub 提示框，方便预览目录、归档时间轴与分类页等组件。
author: 小狐
pubDate: 2024-08-12
updatedDate: 2024-09-01
tags: [主题, 示例, Astro]
categories: [公告]
featured: true
toc: true
---

## 关于本主题

Korikura 是一个基于 **Astro 7** 与 **Tailwind CSS v4** 构建的轻量个人博客主题，支持文章、动态、友链、工具、归档等模块，并内置 SPA 式页面过渡、深浅色主题切换、站内搜索与评论系统。

### 设计理念

尽量“零 JS 也能读”，仅在交互处按需加载脚本；所有视觉状态都用 CSS 变量驱动，方便换肤。

### 技术特性

- 原生 View Transitions 实现的 SPA 路由
- 基于 Material 色板的主题系统
- Shiki 代码高亮 + 代码分组 + KaTeX 公式

## 代码分组示例

下面用 `group=install` 把不同包管理器的安装命令合并为一个可切换的选项卡：

```bash group=install
npm install korikura
```

```bash group=install
pnpm add korikura
```

```bash group=install
yarn add korikura
```

## 数学公式

行内公式如 $E = mc^2$，块级公式同样支持：

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

## 提示框

> [!NOTE]
> 这是一条备注信息，用于演示 GitHub 风格提示框。

> [!TIP]
> 小技巧：点击右侧目录里的父标题，可以折叠 / 展开它的子项。

> [!WARNING]
> 这是一条警告，提醒你示例内容随时可以删除。

## 结语

感谢试用 Korikura 主题。你可以在 `src/content/posts` 与 `src/content/dynamics` 中替换为你自己的内容。
