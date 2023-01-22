import groq from 'groq'

import { image, ImageSrc } from './image'
import { ReferenceWithSlug, referenceWithSlug } from './links'

export type Card = {
	_type: 'card'
	_key: string
	title: string
	subtitle: string
	text: string
	thumbnail: ImageSrc
	href: ReferenceWithSlug | null;
}

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