export default function addTailwindcssReference() {
  return {
    postcssPlugin: 'postcss-add-reference',
    Once(root, { result }) {
      const from = result.opts.from || '';
      if (!from.includes('.astro')) return;
      const css = root.source?.input?.css || '';
      if (css.includes('@reference')) return;
      if (css.includes('@apply')) {
        root.prepend({ name: 'reference', params: '"tailwindcss"' });
      }
    },
  };
}
addTailwindcssReference.postcss = true;