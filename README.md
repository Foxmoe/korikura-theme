# BakaXH 日记（Korikura Theme）

一个基于 **Astro 7 + Tailwind CSS v4** 构建的轻量个人博客，部署于 **Cloudflare Pages**。支持文章 / 动态（仿朋友圈）/ 友链 / 工具 / 归档等模块，并内置 SPA 式页面过渡、主题切换、访客统计、代码分组、目录树、灯箱、搜索与 Twikoo 评论。

## 特性

- **SPA 体验**：基于 View Transitions（`@swup/astro`），页面切换带平滑过渡，无需整页刷新；脚本在 `spa-navigate` 后自动重跑。
- **主题系统**：`auto / light / dark` 三态，默认跟随系统，记忆用户选择；通过 CSS 变量 + Material 色板驱动。
- **内容形态**：
  - 文章（`/posts`）：Markdown / MDX，支持代码高亮（Shiki / rehype-pretty-code）、数学公式（KaTeX）、代码分组（tabbed code group）、过期提示。
  - 动态（`/dynamics`）：仿微信朋友圈的九宫格图片流，点击进灯箱。
  - 友链、工具、归档、标签、分类、关于等独立页面。
- **交互组件**：返回顶部按钮（带顺时针阅读进度环）、目录树（tocbot，H1–H3 层级）、图片灯箱、站内搜索（Pagefind）、访客计数。
- **评论系统**：Twikoo，后端以 Cloudflare Pages Functions（`functions/twikoo.js`）承载，数据存于 MongoDB Atlas。
- **无障碍 / 性能**：静态生成 + 增量岛屿，按需加载 JS；构建产物经 `astro-compressor` 压缩。

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Astro 7 |
| 样式 | Tailwind CSS v4（`@tailwindcss/vite`）、Sass |
| 部署 | Cloudflare Pages（`@astrojs/cloudflare`） |
| 评论 | Twikoo（MongoDB Atlas） |
| 目录 | tocbot |
| 公式 | KaTeX（remark-math / rehype-katex） |
| 搜索 | Pagefind（`astro-pagefind`） |
| 过渡 | @swup/astro（View Transitions） |
| 其他 | React 19 / Svelte 5（岛屿）、Shiki |

## 环境要求

- Node.js **>= 22.12.0**
- pnpm（推荐）

## 开始使用

```sh
# 安装依赖
pnpm install

# 本地开发（默认 http://localhost:4321）
pnpm dev

# 构建产物到 dist/
pnpm build

# 本地预览构建结果
pnpm preview
```

构建后会自动执行 `postbuild`（`scripts/copy-sitemap.js`）将 sitemap 复制到站点根目录。

## 配置

主要配置集中在 `src/config.ts`：

- `title` / `description` / `keywords` —— 站点元信息。
- `navLinks` —— 顶部导航与页脚导航。
- `footer.since` —— 页脚「已运行」计时起点，支持**精确到日**的日期字符串，例如 `"2022-06-01"`（也兼容纯年份数字，回退为该年 1 月 1 日）。
- `footer.icp` / `footer.beian` —— 备案信息。
- `comments.twikooEnv` / `comments.twikooSrc` —— 评论系统配置（见下）。
- `profileConfig` —— 作者头像、昵称、社交链接。
- `friendLinks` / `tools` —— 友链与工具页数据。

文章写在 `src/content/posts/`（`.md` / `.mdx`），动态写在 `src/content/dynamics/`。

## 评论系统（Twikoo）启用

评论组件 `src/components/comments.astro` 已内置，并在文章页、动态详情页、关于页通过 `<Comments />` 引入。默认未填环境 ID 时仅显示提示文字，不会报错。要真正启用：

1. 在 **MongoDB Atlas** 创建数据库，获取连接串 `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/twikoo`。
2. 在 **Cloudflare Pages** 项目环境变量中加入 `TWKOO_MONGODB_URI`，值填上述连接串（服务端函数 `functions/twikoo.js` 会读取）。
3. 在 `src/config.ts` 填入 `comments.twikooEnv`，值为函数地址，例如 `https://<your-domain>/twikoo`（函数文件为 `twikoo.js`，对应路由即 `/twikoo`）。
4. 部署到 Cloudflare Pages，Functions 自动生效。

> 本地 `pnpm dev` 无法看到真实评论（无 Functions 后端与 MongoDB），需部署后生效。

## 部署（Cloudflare Pages）

1. 将仓库推到 Git 平台，在 Cloudflare Pages 新建项目，构建命令 `pnpm build`，输出目录 `dist`。
2. 框架预设选择 Astro，或手动设置：
   - 构建命令：`pnpm install && pnpm build`
   - 构建输出目录：`dist`
3. 如需评论，按上文配置 `TWKOO_MONGODB_URI` 环境变量。
4. 自定义域名在 Cloudflare 侧绑定（`src/config.ts` 的 `url` 一并更新）。

`wrangler.jsonc` 用于本地 Functions 调试（`pnpm generate-types` 生成类型）。

## 目录结构

```
src/
├── components/      # Astro 组件（含交互脚本 ↔ 岛屿）
├── layouts/         # base / default 布局
├── pages/           # 路由页面（posts / dynamics / tags / ...）
├── content/         # 文章(posts) 与动态(dynamics) 内容
├── styles/          # 全局样式 style.css / sidebar.css
├── theme/           # 主题与色板
├── utils/           # 辅助函数（文章统计、字数等）
├── config.ts        # 站点配置
└── content.config.ts
functions/
└── twikoo.js        # Cloudflare Pages Functions：Twikoo 服务端
scripts/
└── copy-sitemap.js  # 构建后复制 sitemap
```

## 许可证

本项目以 [MIT License](./LICENSE) 开源（如仓库根存在 LICENSE 文件）。
