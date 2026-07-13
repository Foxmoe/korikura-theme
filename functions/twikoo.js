// Cloudflare Pages Function：承载 Twikoo 服务端（MongoDB Atlas 模式）
// 部署前请在 Cloudflare Pages 环境变量中设置：
//   TWKOO_MONGODB_URI = mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/twikoo
// 前端 comments.twikooEnv 填写本函数地址，例如 https://<your-domain>/twikoo
import twikoo from "twikoo";

export async function onRequestPost(context) {
  const { request } = context;
  try {
    const body = await request.text();
    const result = await twikoo.Vercel({ body }, {});
    const payload =
      typeof result.body === "string" ? result.body : JSON.stringify(result.body);
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

export async function onRequestGet() {
  return new Response("Twikoo serverless is running.", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
