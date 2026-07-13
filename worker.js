// 自定义 Cloudflare Worker 入口：
import astro from "@astrojs/cloudflare/entrypoints/server";

// dev 模式下 workerd 无法加载 twikoo（其依赖在 workerd 初始化时会崩溃），
// 而本地开发时评论后端直接用线上 Twikoo，无需本地处理 /twikoo，
// 因此仅在非 dev 环境动态加载 twikoo。
let twikoo = null;
if (!import.meta.env.DEV) {
  try {
    twikoo = (await import("twikoo")).default;
  } catch (e) {
    console.error("Failed to load twikoo:", e);
  }
}

export default {
  async fetch(request, env, ctx) {
    try {
      if (env && env.TWKOO_MONGODB_URI) {
        process.env.TWKOO_MONGODB_URI = env.TWKOO_MONGODB_URI;
      }
    } catch (_) {
    }

    const url = new URL(request.url);
    if ((url.pathname === "/twikoo" || url.pathname === "/twikoo/") && twikoo) {
      if (request.method === "POST") {
        try {
          const body = await request.text();
          const result = await twikoo.Vercel({ body }, {});
          const payload =
            typeof result.body === "string"
              ? result.body
              : JSON.stringify(result.body);
          return new Response(payload, {
            status: result.statusCode || 200,
            headers: result.headers || { "content-type": "application/json" },
          });
        } catch (err) {
          return new Response(JSON.stringify({ code: -1, message: String(err) }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      }
      return new Response("Twikoo serverless is running.", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    return astro.fetch(request, env, ctx);
  },
};
