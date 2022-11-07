import groq from "groq";

import { header } from './header'
import { footer } from './footer'
import { referenceWithSlug } from "../objects/links";
import { filterById } from "../utils";
import { post } from '../objects/post'

export const blogPost = groq`
	"header": {
		${header},
		"translations": *[_type == 'blog-post']${filterById.replace('$id', '^._id')} { 
			${referenceWithSlug}
		},
	},
	title, 
	"post": {
		${post}
	},
	"lang": __i18n_lang,
	"footer": {
		${footer}
	},
`