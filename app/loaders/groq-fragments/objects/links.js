import groq from 'groq'

import { normalizeSlug } from '../utils/normalizers'

export const pageReference = groq`
	"slug": ${normalizeSlug}, 
	title,
	"lang": __i18n_lang,
	_updatedAt
`

export const links = groq`
  _type == 'navLink' => {
		"key": _key,
		_type,
		title,
		url
	},
	_type == 'navPage' => {
		"key": _key,
		_type,
		...page-> {
			${pageReference}
		}
	}
`