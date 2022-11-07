import groq from 'groq'

import { referenceWithSlug } from '../objects/links'
import { footer } from './footer'
import { header } from './header'
import { modules } from '../objects/modules'
import { filterById } from '../utils/filters'

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
