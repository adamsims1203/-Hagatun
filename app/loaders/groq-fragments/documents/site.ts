import groq from 'groq'
import { i18nConfig } from '../../../../sanity/lib/i18n'

import { ReferenceWithSlug, referenceWithSlug } from '../objects/links'
import { filterById, filterSavedPages } from '../utils/filters'
import { image, ImageSrc } from '../objects/image'
import { Header, header } from './header'
import { Footer, footer } from './footer'

export type Site = {
	home: ReferenceWithSlug
	pages: (ReferenceWithSlug & { translations: ReferenceWithSlug[] })[]
	header: Header
	footer: Footer
	company: {
		_key: string
		_type: 'information',
		postalAddress: string
		email: string
		offices?: {
			_type: 'office'
			_key: string
			address: string
			name: string
			phoneNumber: string
		}[]
	}
	title: string
	shortTitle: string
	rootDomain: string
	presets: {
		themeSwitch: boolean
		languageSelect: boolean
	}

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
		favicon: ImageSrc | null,
		faviconLegacy: ImageSrc | null,
		shareGraphic: ImageSrc | null,
		touchIcon: ImageSrc | null
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
		"presets": {
			"themeSwitch": presets.themeSwitch,
			"languageSelect": presets.languageSelect,
		},
		gtmID
	},
	"cookieConsent": *[_type == "cookieSettings"][0]{
		enabled,
		message,
		"link": link->{"type": _type, "slug": slug.current}
	},
	"header": {
		${header}
	},
	"footer": {
		${footer}
	},
	"company": *[_type == "generalSettings"][0] {
		"_type": "information",
		_key,
		email,
		postalAddress,
		offices
	},
	"seo": *[_type == "seoSettings"][0]{
		metaTitle,
		metaDesc,
		shareTitle,
		shareDesc,
		shareGraphic {
			${image}
		},
		favicon {
			${image}
		},
		faviconLegacy {
			${image}
		},
		touchIcon {
			${image}
		},
	}
`
