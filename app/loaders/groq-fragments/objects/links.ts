import groq from 'groq'
import { Locale } from 'studio/lib/i18n'

import { normalizeSlug } from '../utils/normalizers'

export type ReferenceWithSlug = {
	_key: string,
	_updatedAt: string
	slug: string
	title: string
	lang: Locale
}

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