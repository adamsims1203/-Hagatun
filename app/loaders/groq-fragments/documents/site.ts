import groq from 'groq'
import { i18nConfig } from '../../../../studio/lib/i18n'

import { ReferenceWithSlug, referenceWithSlug } from '../objects/links'
import { filterById, filterSavedPages } from '../utils/filters'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type Site = {
	home: ReferenceWithSlug
	pages: (ReferenceWithSlug & { translations: ReferenceWithSlug[] })[]

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

export const site = groq`
	"home": *[_type == 'page']${filterById.replace('$id', '*[_type=="generalSettings"][0].home->_id')}[__i18n_lang == $lang][0] {
		${referenceWithSlug}
	},
	"pages": *${filterSavedPages}[__i18n_lang == '${i18nConfig.base}'] {
		${referenceWithSlug},
		"translations": *[_type == 'page']${filterById.replace('$id', '^._id')}[__i18n_lang != '${i18nConfig.base}'] { 
			${referenceWithSlug}
		}
	},
	...*[_type == "generalSettings"][0] {
		"title": siteTitle.long,
		"shortTitle": siteTitle.short,
		"rootDomain": ${process.env.NODE_ENV === 'development' ? `'localhost:3000'` : `siteURL`},
		gtmID,
	},
	"cookieConsent": *[_type == "cookieSettings"][0]{
		enabled,
		message,
		"link": link->{"type": _type, "slug": slug.current}
	},
	"seo": *[_type == "seoSettings"][0]{
		metaTitle,
		metaDesc,
		shareTitle,
		shareDesc,
		shareGraphic,
		"favicon": favicon.asset->url,
		"faviconLegacy": faviconLegacy.asset->url,
		touchIcon
	}
`
