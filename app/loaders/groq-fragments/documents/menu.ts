import groq from 'groq'

import { links, ReferenceWithSlug } from '../objects/links'

export type MenuItem = 
	| { _type: 'navPage' } & ReferenceWithSlug
	| {
		_key: string
		_type: 'navLink'
		title: string
		url: string
	}

export const menu = groq`
	"_key": _rev,
	_type,
	title,
	"items": [
		...items[_type != 'reference'] {
			${links}
		},
		...items[_type == 'reference']-> {
			"_key": _rev,
			_type,
			title,
			"items": items[] {
				${links}
			}
		},
	]
`