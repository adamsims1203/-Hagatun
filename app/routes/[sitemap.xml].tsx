/*
 * https://dev.to/chrisbenjamin/tutorial-add-sitemapxml-and-robotstxt-to-remix-site-4n23
 * https://www.leanpanda.com/blog/2015-09-12-alternate-sitemap/
 */

import { LoaderFunction } from '@remix-run/node';
import { getSite } from '~/loaders'

let sitemap: string | undefined

const init = {
	status: 200,
	headers: {
		"Content-Type": "application/xml",
		"xml-version": "1.0",
		"encoding": "UTF-8"
	}
}

export const getUrl = (root: string, slug: string) => `https://${root}/${slug.replace(/^\//, '')}`

export const loader: LoaderFunction = async ({ params }) => {
	const { site } = await getSite(params)

  // If our sitemap is cached, we write the cached sitemap, no query to the CMS.
  if (sitemap || !site)
    return new Response(sitemap, init)

	const pages = site.pages.filter(p => !p.slug.endsWith('404')).map(p => ({ 
		url: p.slug,
		lang: p.lang,
		changefreq: p.slug ? 'weekly' : /* should be index */'daily',
		priority: p.slug ? .7 : /* should be index */1.0,
		translations: p.translations.map(t => ({
			url: t.slug,
			lang: t.lang,
			changefreq: 'weekly',
			priority: .7,
		}))
	})).sort((a,b) => a.url.length - b.url.length)

	sitemap = `
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1.0" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			${pages.map(page => `
				<url>
					<loc>${getUrl(site.rootDomain, page.url)}</loc>
					<priority>${page.priority}</priority>
					<changefreq>${page.changefreq}</changefreq>
					${page.translations.map(t => `
						<xhtml:link rel="alternate" hreflang="${t.lang}" href="${getUrl(site.rootDomain, t.url)}" />
					`).join('')}
				</url>
			`).join('')}
		</urlset>
	`
	// Return the response with the content, a status 200 message, and the appropriate headers for an XML page
	return new Response(sitemap,{
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"xml-version": "1.0",
			"encoding": "UTF-8"
		}
	});
};