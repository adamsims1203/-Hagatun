import groq from 'groq'

import { image } from './image'
import { pageReference } from './links'

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
		${pageReference}
	}
`