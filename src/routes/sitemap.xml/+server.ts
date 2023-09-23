export const prerender = true
import * as config from '$lib/config'
import type { Post } from '$lib/types'

const site = "https://www.example.com"

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const rawPosts = await fetch('api/posts')
	const posts: Post[] = await rawPosts.json()

	// const headers = { 'Content-Type': 'application/xml' }

	// const xml = `
	// 	<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	// 		<channel>
	// 			<title>${config.title}</title>
	// 			<description>${config.description}</description>
	// 			<link>${config.url}</link>
	// 			<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
	// 			${posts
	// 				.map(
	// 					(post) => `
	// 					<item>
	// 						<title>${post.title}</title>
	// 						<description>${post.description}</description>
	// 						<link>${config.url}/${post.slug}</link>
	// 						<guid isPermaLink="true">${config.url}/${post.slug}</guid>
	// 						<pubDate>${new Date(post.date).toUTCString()}</pubDate>
	// 					</item>
	// 				`
	// 				)
	// 				.join('')}
	// 		</channel>
	// 	</rss>
	// `.trim()

	// return new Response(xml, { headers })
	const pages = []

	const body = sitemap(posts);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');
    return response;
}


const sitemap = (posts: Post[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${config.title}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  ${posts.map((post) => post.published ?  `
  <url>
    <loc>${config.url}/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.date}</lastmod>
    <priority>0.3</priority>
  </url>
  `
	: null	)
		.join('')}
</urlset>`;


// ${pages.map((page) => `
// <url>
//   <loc>${config.title}/${page}</loc>
//   <changefreq>daily</changefreq>
//   <priority>0.7</priority>
// </url>
// `).join('')}