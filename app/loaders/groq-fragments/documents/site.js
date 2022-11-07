import groq from 'groq'
import { i18n } from '~/loaders/i18n'

import { referenceWithSlug } from '../objects/links'
import { menu } from '../documents/menu'
import { filterById, filterSavedPages } from '../utils/filters'

export const site = groq`
	"home": *${filterById.replace('$id', '*[_type=="generalSettings"][0].home->_id')}[__i18n_lang == $lang][0] {
		${referenceWithSlug}
	},
	"pages": *${filterSavedPages}[__i18n_lang == '${i18n.base}'] {
		${referenceWithSlug},
		"translations": *[_type == 'page']${filterById.replace('$id', '^._id')}[__i18n_lang != '${i18n.base}'] { 
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
