import groq from 'groq'

import { Modules, modules } from '../objects/modules'
import { Locale } from 'sanity/lib/i18n'
import { referenceWithSlug } from '../objects/links'
import { filterById } from '../utils'

export type Page = {
	id: string
	title: string
	lang: Locale
	modules: Modules[] | null
	seo: any
	translations: {
		slug: string
		title: string
		lang: Locale
	}[]
} | null | undefined

export const page = groq`
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
	"translations": *[_type == 'page']${filterById.replace('$id', '^._id')} { 
		${referenceWithSlug}
	},
`
