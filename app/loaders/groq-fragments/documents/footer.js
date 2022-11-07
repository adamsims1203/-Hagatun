import groq from 'groq'

import { menu } from './menu'

export const footer = groq`
	...*[_type == "footerSettings" && _id == "footerSettings"][0] {
		"blocks": [
			{
				"_type": "bio",
				"_key": _rev,
				socialLinks[]{
					icon,
					url
				},
				...*[_type == "generalSettings"][0] {
					"bio": bio[$lang]
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
			*[_type == "generalSettings"][0] {
				"_type": "information",
				"_key": _rev,
				email,
				postalAddress,
				offices
			}
		],
	}
`