import groq from 'groq'

import { normalizeSlug } from '../utils/normalizers'

export const referenceWithSlug = groq`
	"slug": ${normalizeSlug}, 
	title,
	"lang": __i18n_lang,
	_updatedAt
`


export const referenceBlogPostWithSlug = groq`
	"slug": ${normalizeSlug}, 
	title,
	"lang": __i18n_lang,
	_updatedAt
`

export const links = groq`
  _type == 'navLink' => {
		_key,
		_type,
		title,
		url
	},
	_type == 'navPage' => {
		_key,
		_type,
		...page-> {
			${referenceWithSlug}
		}
	}
`