import groq from 'groq'

import { referenceWithSlug } from '../objects/links'
import { Footer, footer } from './footer'
import { Header, header } from './header'
import { Modules, modules } from '../objects/modules'
import { filterById } from '../utils/filters'
import { Locale } from 'sanity/lib/i18n'

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
		offices?: {
			_type: 'office'
			_key: string
			address: string
			name: string
			phoneNumber: string
		}[]
	}
	seo: any
} | null | undefined

export const page = groq`
	"header": {
		${header},
		"translations": *[_type == 'page']${filterById.replace('$id', '^._id')} { 
			${referenceWithSlug}
		},
	},
	"id": _id,
	title,
	"lang": __i18n_lang,
	modules[]{
		defined(_ref) => { ...@->content[0] {
			${modules}
		}},
		!defined(_ref) => {
			${modules},
		}
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
	}
`
