# AGENTS.md

本文件供 AI 编码代理快速理解项目结构、约定与易错点。人类开发者可参考 `README.md`。

## 项目概览

- **类型**：基于 Astro 7 + Tailwind CSS v4（通过 `@tailwindcss/vite`）的静态个人博客，部署到 Cloudflare Pages。
- **包管理**：pnpm。Node >= 22.12。
- **临时运行**：`pnpm dev`（默认 http://localhost:4321）。构建：`pnpm build`（产物 `dist/`，`postbuild` 复制 sitemap）。预览：`pnpm preview`。
- **重要**：在仓库根直接运行命令时先 `cd` 到项目根目录。

## 目录约定

```
src/
├── components/      # Astro 组件 + 交互脚本（岛屿用 React 19 / Svelte 5）
├── layouts/         # base.astro / default.astro
├── pages/           # 路由（posts / dynamics / tags / about / ...）
├── content/         # 文章(posts) 与动态(dynamics) 内容
├── styles/          # style.css（全局）、sidebar.css
├── theme/           # 主题与 Material 色板
├── utils/           # 辅助函数
├── config.ts        # 站点配置（profileConfig / siteConfig / navLinks / comments ...）
└── content.config.ts
scripts/copy-sitemap.js  # 构建后复制 sitemap
```

- 路径别名 `@/*` 映射到 `src/*`（见 `tsconfig.json` 的 `paths`）。`import ... from "@/config"` 即 `src/config.ts`。
- `Default` 布局接收具名 slot：`sidebar`（传给 `<Sidebar headings={...} />`）与默认内容槽。文章页还会传 `headings` 给目录树。

## 关键约定与易错点

### 1. Tailwind v4 写法
- 用 `@tailwindcss/vite`（非 PostCSS 插件）。组件 `<style lang="scss">` 内可用 `@apply` 与 `@tailwind` 指令。
- **CSS 变量颜色**写法：`text-(--primary)`、`bg-(--card-bg)/50`、`border-(--primary)/40`、`bg-(--primary)/12`。注意透明度修饰符 `/50`、`/12` 直接写在变量形式后是合法的。
- **渐变 / 混合色**用 `color-mix(in oklab, var(--primary) 50%, transparent)`，不要用旧的 `theme()` 或 rgb 百分比拼接。
- `data-astro-cid-*` 属性会注入到组件根元素上；写正则/选择器提取 DOM 时不要把 `class="about"` 当作精确匹配（实际是 `class="about" data-astro-cid-xxx`）。

### 2. 代码分组（tabbed code group）
- 机制：在 `astro.config.mjs` 的 `shikiConfig.transformers` 中读取 fence 元信息 `group=xxx`，写入 `<pre>` 的 `data-group` 属性（本版 Shiki 把 transformer 上下文绑定在 `this`，且 Astro 把元信息包成 `{ __raw }` 放在 `this.options.meta.__raw`，**不要**读 `context.meta`）。对 `.md` 和 `.mdx` 均生效。
- **不要在构建期用 rehype 插件做分组**——MDX 管线里 rehype 插件会在 Shiki 之前运行，看不到 `astro-code` / `data-group`，且曾因 `isCodePre` 未定义导致构建崩溃。
- 可靠做法：在 `src/components/codeEnhancer.astro` 的客户端脚本里，把连续同组、带 `data-group` 的 `pre.astro-code` 包成 `.code-group` 并生成 `.code-tabs` 选项卡；随 `spa-navigate` 重跑。样式在 `src/styles/style.css`（`.code-group` / `.code-tabs` / `.code-tab` / `.code-pane`）。
- 验证：构建后 `grep` 产物 HTML 中 `pre` 是否带 `data-group="xxx"`。

### 3. 图标组件 `src/components/icon.astro`
- SVG path 以 `name: '<path .../>'` 形式集中定义在组件顶部对象中。
- 新增图标时直接在该对象里补一条（可复用 Feather/Lucide 风格 path），并在 `<Icon name="..." />` 引用。可用的常见名：`folder`、`star`、`message`、`sun`、`link`、`mail`、`heart`、`info`、`palette`、`github`、`email` 等（以文件内实际定义为准，新增前先确认存在，避免空白图标）。

### 4. 关于页 `src/pages/about.astro`
- 单文件自定义页面。区块：个人信息 Hero（左右分栏 + 光斑 + 头像光环）、关于卡片、特性卡片、技能栈（进度条，数据在 `skills` 数组）、足迹时间线（`timeline` 数组，复用全局 `.timeline`）、统计卡片、`<Comments />`。
- 样式使用主题变量 + `card` 类 + `data-ripple`（波纹）+ `reveal`（入场动画，由全局脚本处理）。新增区块时沿用 `card` / `data-ripple` / `reveal` 与 `color-mix` 渐变，保持风格统一。
- 修改 Hero / 卡片后建议本地 `pnpm dev` 截图核对视觉。

### 5. 主题系统
- `auto / light / dark` 三态，默认跟随系统，记忆用户选择；由 CSS 变量 + Material 色板驱动（`src/theme/` + `src/styles/style.css`）。新增组件不要硬编码颜色，统一用 `--primary` / `--text` / `--muted` / `--border` / `--card-bg`。

### 6. 评论系统（Waline）
- `src/components/comments.astro` 用 `@waline/client`，后端是独立 Cloudflare Worker（D1）。前端 `serverURL` 在 `src/config.ts` 的 `comments.walineServer`。
- SPA 切换时监听 `spa-navigate` 重新初始化。本地 `pnpm dev` 看评论需后端 Worker 已上线。

## 完成修改后的收尾
- 删除临时产物：截图 png、抓取用的 `*.html`、`dev.log`、`dev.err`，避免污染仓库。
- 不要提交 IDE / 调试产物。
- 若改动影响文档，同步更新 `README.md`（必要时新建/更新 `AGENTS.md`）。
- 关闭本地 dev server（`Stop-Process -Name "astro"`），注意别误杀其他必要 node 进程。
