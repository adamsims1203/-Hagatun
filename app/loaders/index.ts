import { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '~/utils/sanityClient'
import { urlBuilder } from '~/utils/urlBuilder'
import { loadTheme } from '~/utils/theme.server'
import { assert } from '~/utils/utils'
import { blogPostQueryBySlug, pageQueryBySlug, siteQuery } from './groq-fragments/query'
import { getLocaleFromPath, i18n, Locale } from './i18n'
import { Theme } from '~/utils/theme-provider'
import type { PortableTextBlock } from '@portabletext/types'

export type ImageSrc = {
	src: string
	alt: string
}

export type referenceWithSlug = {
	_key: string,
	_updatedAt: string
	slug: string
	title: string
	lang: Locale
}

export type MenuItem = 
	| { _type: 'navPage' } & referenceWithSlug
	| {
		_key: string
		_type: 'navLink'
		title: string
		url: string
	}

export type Card = {
	_type: 'card'
	_key: string
	title: string
	subtitle: string
	text: string
	thumbnail: ImageSrc
	href: referenceWithSlug | null;
}

export type Modules = 
	| {
		_type: 'start-page-hero'
		_key: string
		title: string
		subtitle: string
		bgType: string
		photos: {
			mobilePhoto: ImageSrc
			desktopPhoto: ImageSrc
		}
		video: {
			id: string
			title: string
		}
	} 
	| {
		_type: 'cta',
		_key: string
		title: string
		cards: Card[]
	}
	| {
		_type: 'hero'
		_key: string
		title: string
		text: string
		image: ImageSrc
		theme: Theme
		contentPlacement: 'left' | 'right'
	}
	| {
		_type: 'partners'
		_key: string
		title: string
		text: string
		partnerLogos: {
			_key: string
			logo: ImageSrc
			href: string
		}[]
	}
	| {
		_key: string
		_type: 'blog-posts'
		orderBy: 'recent' | 'featured'
		posts: Post[]
	}
	/* | {
		_type: 'marquee'
		_key: string
		items: (null | null)[]
    speed: number
    reverse: boolean
    pauseable: boolean
	} */

export type Post = {
	_type: 'blog-post'
	_key: string
	href: {
		slug: string
		title: string
		lang: string
	}
	title: string
	publishedAt: string
	body: PortableTextBlock
	authorName: string
	excerpt?: string
	image?: ImageSrc
}

export type Site = {
	home: referenceWithSlug
	pages: (referenceWithSlug & { translations: referenceWithSlug[] })[]

	title: string
	shortTitle: string
	rootDomain: string

	cookieConsent: {
		enabled: boolean
		message: null
		link: null
	}

	seo: {
		metaTitle: string,
		metaDesc: string,
		shareTitle: string,
		shareDesc: string,
		favicon: string | null,
		faviconLegacy: string | null
		shareGraphic: SanityImageObject | null,
		touchIcon: SanityImageObject | null
	}
} | null | undefined

export type Header = {
	menu: { 
		_key: string,
		_type: 'menu'
		items: (
			{ 
				_key: string
				_type: 'menu'
				title: string
				items: MenuItem[]
			} | MenuItem
		)[]
	}
	translations: {
		slug: string
		title: string
		lang: string
	}[]
}

export type Footer = {
	blocks:
	(
		| {
			_key: string,
			_type: 'bio',
			bio: string
			socialLinks: {
				icon: string
				url: string
			}[]
		}
		| { 
			_key: string,
			_type: 'menu'
			title: string
			items: MenuItem[]
		}
		| {
			_key: string
			_type: 'information',
			postalAddress: string
			email: string
			offices: {
				_type: 'office'
				_key: string
				address: string
				name: string
				phoneNumber: string
			}[]
		}
	)[]
}

export type Page = {
	id: string
	title: string
	lang: Locale
	header: Header
	modules: Modules[] | null
	footer: Footer
	company: {
		_key: string
		_type: 'information',
		postalAddress: string
		email: string
		offices: {
			_type: 'office'
			_key: string
			address: string
			name: string
			phoneNumber: string
		}[]
	}
	seo: any
} | null | undefined

export type BlogPost = {
	_key: string
	_type: 'blog-post'
	lang: Locale
	orderBy: 'recent' | 'featured'
	header: Header
	post: Post
	footer: Footer
}

export async function getPage(slug?: string) {
	let page: Page | undefined
	let urlLang = getLocaleFromPath(slug, false)
	const lang = urlLang||i18n.base

	slug = 
		// base lang have been stripped of and needs to be included
		!urlLang && slug ? `${i18n.base}/${slug}` 
		// accessing index route, needs to include base lang
		: !slug ? `${lang}` 
		: slug
		
	try {
		page = await client.fetch<Page>(pageQueryBySlug, { slug, lang })
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
	const lang = urlLang||i18n.base

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
	const lang = urlLang||i18n.base

	slug = 
		// base lang have been stripped of and needs to be included
		!urlLang && slug ? `${i18n.base}/${slug}` 
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
