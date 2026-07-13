// 自定义 Cloudflare Worker 入口：
import astro from "@astrojs/cloudflare/entrypoints/server";

export default {
  async fetch(request, env, ctx) {
    return astro.fetch(request, env, ctx);
  },
};
