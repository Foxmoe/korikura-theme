export default function addTailwindcssReference() {
  return {
    postcssPlugin: 'postcss-add-reference',
    Once(root, { result }) {
      const from = result.opts.from || '';
      // 只处理来自 .astro 样式块（编译后为 CSS）
      if (!from.includes('.astro')) return;
      const css = root.source?.input?.css || '';
      // 已有 @reference 则跳过
      if (css.includes('@reference')) return;
      if (css.includes('@apply')) {
        // 在 CSS 最前面插入 @reference "tailwindcss";
        root.prepend({ name: 'reference', params: '"tailwindcss"' });
      }
    },
  };
}
addTailwindcssReference.postcss = true;