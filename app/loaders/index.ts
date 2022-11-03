import { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '~/utils/sanityClient'
import { urlBuilder } from '~/utils/urlBuilder'
import { loadTheme } from '~/utils/theme.server'
import { assert } from '~/utils/utils'
import { pageQueryBySlug, siteQuery } from './groq-fragments/query'
import { getLocaleFromPath, i18n, Locale } from './i18n'
import { Theme } from '~/utils/theme-provider'

export type ImageSrc = {
	src: string
	alt: string
}

export type PageReference = {
	_key: string,
	_updatedAt: string
	slug: string
	title: string
	lang: Locale
}

export type MenuItem = 
	| { _type: 'navPage' } & PageReference
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
	href: PageReference | null;
}

export type Modules = 
	| {
		_type: 'hero'
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
		_type: 'text-image'
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
		_type: 'marquee'
		_key: string
		items: (null | null)[]
    speed: number
    reverse: boolean
    pauseable: boolean
	}

export type Site = {
	home: PageReference
	pages: (PageReference & { translations: PageReference[] })[]

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

export type Page = {
	id: string
	title: string
	lang: Locale
	header: {
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
	hasTransparentHeader: boolean
	modules: Modules[] | null
	footer: {
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

export interface RouteData extends 
	Awaited<ReturnType<typeof getPage>>, 
	Awaited<ReturnType<typeof getSite>>, 
	Awaited<ReturnType<typeof loadTheme>> {}

const getShareGraphic = (src: SanityImageSource) => urlBuilder.image(src).width(1200).height(630).url()

const buildPageImages = (page: Page) => ({
	shareGraphic: page?.seo?.shareGraphic && getShareGraphic(page?.seo?.shareGraphic)
})

const buildSiteImages = (site: Site) => ({
	shareGraphic: site?.seo?.shareGraphic && getShareGraphic(site.seo.shareGraphic),
	sitTouchIcon: site?.seo?.touchIcon && urlBuilder.image(site.seo.touchIcon).width(192).height(192).url()
})
