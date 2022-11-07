import groq from "groq";

import { menu } from "./menu";

export const header = groq`
	...*[_type == "headerSettings"][0] {
		"menu": *[_type == 'menu' && string::startsWith(_id, ^.menu._ref) && __i18n_lang == $lang][0] {
			${menu}
		},
	}
`
