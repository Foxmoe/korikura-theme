// robot.txt

import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Disallow: /assets/
Disallow: /console/
Disallow: /.well-known/

Sitemap: ${new URL("sitemap-0.xml", import.meta.env.SITE).href}
Sitemap: ${new URL("sitemap.xml", import.meta.env.SITE).href}

Crawl-delay: 5
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
