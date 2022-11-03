import groq from 'groq'

import { links } from '../objects/links'

export const menu = groq`
	"_key": _rev,
	_type,
	title,
	"items": [
		...items[_type == 'reference']-> {
			"_key": _rev,
			_type,
			title,
			"items": items[] {
				${links}
			}
		},
		...items[_type != 'reference'] {
			${links}
		}
	]
`