import { SITE_URL } from '$lib/config/site';

const ROBOTS = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;

export function GET() {
	return new Response(ROBOTS, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
