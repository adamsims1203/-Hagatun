
import { client } from '~/utils/sanityClient'
import { urlBuilder } from '~/utils/urlBuilder'
import { loadTheme } from '~/utils/theme.server'
import { assert } from '~/utils/utils'
import { blogPostQueryBySlug, pageQueryBySlug, pageQueryById, siteQuery, queryHomeID } from './groq-fragments/query'
import { getLocaleFromPath, i18nConfig } from '../../sanity/lib/i18n'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { BlogPost } from './groq-fragments/documents/blog-post'
import type { Page } from './groq-fragments/documents/page'
import type { Site } from './groq-fragments/documents/site'
import type { Modules } from './groq-fragments/objects/modules'
export type { Page, Site, BlogPost, Modules }


export async function getPage(slug?: string) {
	let page: Page | undefined
	let urlLang = getLocaleFromPath(slug, false)
	const lang = urlLang||i18nConfig.base

	slug = 
		// base lang have been stripped of and needs to be included
		!urlLang && slug ? `${i18nConfig.base}/${slug}` 
		// accessing index route, needs to include base lang
		: !slug ? `${lang}` 
		: slug
		
	try {
		if(slug === lang) {
			page = await client.fetch<Page>(pageQueryById.replace('$id', queryHomeID), { lang })
		} else {
			page = await client.fetch<Page>(pageQueryBySlug, { slug, lang })
		}
	} catch (error: unknown) {
		if(
			error &&
			typeof error === 'object' && 
			'code' in error && 
			(error as any).code === 'ECONNRESET'
		) throw Error('Connection request was abruptly closed by peer', { cause: 500 })
	}
	
	page && assert(
		page.lang === lang, 
		`pathname language didn't match the page results language`
	)
	
	return { 
		page: page ? Object.assign(page, {
			images: buildPageImages(page)
		}) : undefined,
		lang,
		notFound: !page
	}
}

export async function getSite(path?: string) {
	let urlLang = getLocaleFromPath(path, false)
	const lang = urlLang||i18nConfig.base

	const site = await client.fetch<Site>(siteQuery, { lang })
	assert(site, 'site was undefined')
	
	return { 
		site: Object.assign(site, {
			images: buildSiteImages(site)
		})
	}
}

export async function getBlogPost(slug?: string) {
	let blogPost: BlogPost | undefined
	let urlLang = getLocaleFromPath(slug, false)
	const lang = urlLang||i18nConfig.base

	slug = 
		// base lang have been stripped of and needs to be included
		!urlLang && slug ? `${i18nConfig.base}/${slug}` 
		// accessing index route, needs to include base lang
		: !slug ? `${lang}` 
		: slug
	
	try {
		blogPost = await client.fetch<BlogPost>(blogPostQueryBySlug, { slug, lang })
	} catch (error: unknown) {
		if(
			error &&
			typeof error === 'object' && 
			'code' in error && 
			(error as any).code === 'ECONNRESET'
		) throw Error('Connection request was abruptly closed by peer', { cause: 500 })
	}
	
	blogPost && assert(
		blogPost.lang === lang, 
		`pathname language didn't match the page results language`
	)
	
	return { 
		post: blogPost ? Object.assign(blogPost, {
			images: buildBlogPostImages(blogPost)
		}) : undefined,
		lang,
		notFound: !blogPost
	}
}

export interface RouteData extends 
	Awaited<ReturnType<typeof getPage>>, 
	Awaited<ReturnType<typeof getBlogPost>>, 
	Awaited<ReturnType<typeof getSite>>, 
	Awaited<ReturnType<typeof loadTheme>> {}

const getShareGraphic = (src: SanityImageSource) => urlBuilder.image(src).width(1200).height(630).url()

const buildPageImages = (page: Page) => ({
	shareGraphic: page?.seo?.shareGraphic && getShareGraphic(page?.seo?.shareGraphic)
})

const buildBlogPostImages = (post: BlogPost) => ({
	shareGraphic: undefined
})

const buildSiteImages = (site: Site) => ({
	shareGraphic: site?.seo?.shareGraphic && getShareGraphic(site.seo.shareGraphic),
	sitTouchIcon: site?.seo?.touchIcon && urlBuilder.image(site.seo.touchIcon).width(192).height(192).url()
})
