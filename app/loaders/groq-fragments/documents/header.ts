import groq from "groq";

import { menu, MenuItem } from "./menu";

export type Header = {
	menu: { 
		_key: string,
		_type: 'menu'
		items?: (
			{ 
				_key: string
				_type: 'menu'
				title: string
				items?: MenuItem[]
			} | MenuItem
		)[]
	}
	translations: {
		slug: string
		title: string
		lang: string
	}[]
}

export const header = groq`
	...*[_type == "headerSettings"][0] {
		"menu": *[_type == 'menu' && string::startsWith(_id, ^.menu._ref) && __i18n_lang == $lang][0] {
			${menu}
		},
	}
`
