import { SITE_URL } from '$lib/config/site';

const PAGES = [
	'/',
	'/about',
	'/services',
	'/portfolio',
	'/studio',
	'/book',
	'/contact'
];

export function GET() {
	const now = new Date().toISOString();
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
