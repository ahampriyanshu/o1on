export const prerender = true
import * as config from '$lib/config'
import type { Post } from '$lib/types'

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	const rawPosts = await fetch('api/posts')
	const posts: Post[] = await rawPosts.json()
	const pages: string[] = []

	const body = sitemap(posts, pages)
	const response = new Response(body)
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600')
	response.headers.set('Content-Type', 'application/xml')
	return response
}

const sitemap = (posts: Post[], pages: string[]) => { 
  
  const latestDate = posts[0].date;
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${config.url}</loc>
    <changefreq>daily</changefreq>
    <lastmod>${latestDate}</lastmod>
    <priority>1</priority>
  </url>
  ${pages.map((page) => 
  `
  <url>
    <loc>${config.title}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
  ).join('')} ${posts.map((post) =>post.published ? 
  `
  <url>
    <loc>${config.url}/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.date}</lastmod>
    <priority>0.5</priority>
  </url>
  `
  : null).join('')}
</urlset>`
  };
