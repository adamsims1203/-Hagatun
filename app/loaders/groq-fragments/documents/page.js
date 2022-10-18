import groq from 'groq'

import { pageReference } from '../objects/links'
import { menu } from './menu'
import { modules } from '../objects/modules'
import { filterById } from '../utils/filters'

export const page = groq`
	"header": {
		...*[_type == "headerSettings"][0] {
			"menu": *[_type == 'menu' && string::startsWith(_id, ^.menu._ref) && __i18n_lang == $lang][0] {
				${menu}
			},
		},
		"translations": *[_type == 'page']${filterById.replace('$id', '^._id')} { 
			${pageReference}
		},
	},
	"id": _id,
	title,
	"lang": __i18n_lang,
	hasTransparentHeader,
	modules[]{
		defined(_ref) => { ...@->content[0] {
			${modules}
		}},
		!defined(_ref) => {
			${modules},
		}
	},
	"footer": *[_type == "footerSettings" && _id == "footerSettings"][0]{
		"blocks": [
			{
				"title": blockTitle1,
				social[]{
					icon,
					url
				}
			},
			blockMenu2->{
				...*[_type == 'menu' && string::startsWith(_id, ^._id) && __i18n_lang == $lang][0] {
					${menu}
				},
			},
			blockMenu3->{
				...*[_type == 'menu' && string::startsWith(_id, ^._id) && __i18n_lang == $lang][0] {
					${menu}
				},
			},
		]
	},
`
