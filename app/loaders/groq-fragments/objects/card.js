import groq from 'groq'

import { image } from './image'
import { referenceWithSlug } from './links'

export const card = groq`
	_type,
	_key,
	title,
	subtitle,
	thumbnail{
		${image}
	},
	text,
	"href": link->{
		${referenceWithSlug}
	}
`