import groq from "groq";

import { Header, header } from './header'
import { Footer, footer } from './footer'
import { referenceWithSlug } from "../objects/links";
import { filterById } from "../utils";
import { post } from '../objects/post'
import { PortableTextBlock } from "sanity";
import { ImageSrc } from "../objects/image";
import { Locale } from "studio/lib/i18n";

export type Post = {
	_type: 'blog-post'
	_key: string
	href: {
		slug: string
		title: string
		lang: string
	}
	title: string
	publishedAt: string
	body: PortableTextBlock
	authorName: string
	excerpt?: string
	image?: ImageSrc
}

export type BlogPost = {
	_key: string
	_type: 'blog-post'
	lang: Locale
	orderBy: 'recent' | 'featured'
	header: Header
	post: Post
	footer: Footer
}

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