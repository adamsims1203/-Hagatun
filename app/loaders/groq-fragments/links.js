import groq from 'groq'

import { referenceWithSlug } from './page'

export const links = groq`
  _type == 'navLInk' => {
		"id": _id,
		_type,
		title,
		url
	},
	_type == 'navPage' => page->{
		${referenceWithSlug}
	}
`