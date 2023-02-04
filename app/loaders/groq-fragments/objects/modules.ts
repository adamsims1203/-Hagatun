import groq from 'groq'

import { image, ImageSrc } from './image'
import { Card, card } from './card'
import { post } from './post'
import { Theme } from '~/utils/theme-provider'
import { Post } from '../documents/blog-post'
import { PortableTextBlock } from 'sanity'

type StartPageHeroModule = {
	_type: 'start-page-hero'
	_key: string
	title: string
	subtitle: string
	bgType: string
	image: ImageSrc
	video: {
		id: string
		title: string
	}
	theme: Theme
} 

type CTAModule = {
	_type: 'cta',
	_key: string
	title: string
	cards: Card[]
}

type HeroModule = {
	_type: 'hero'
	_key: string
	title: string
	text: string
	image: ImageSrc
	theme: Theme
	contentPlacement: 'left' | 'right'
}

type PartnersModule = {
	_type: 'partners'
	_key: string
	title: string
	text: string
	partnerLogos: {
		_key: string
		logo: ImageSrc
		href: string
	}[]
}

type BlogPostsModule = {
	_key: string
	_type: 'blog-posts'
	orderBy: 'recent' | 'featured'
	posts: Post[]
}

type TextImageModule = {
	_type: 'text-image'
	_key: string
	body: PortableTextBlock
	photo: ImageSrc
	alignment: 'left' | 'right'
}

export type Modules = 
	| StartPageHeroModule
	| CTAModule
	| HeroModule
	| PartnersModule
	| BlogPostsModule
	| TextImageModule

export const modules = groq`
  _type == 'start-page-hero' => {
    _type,
    _key,
		title,
		subtitle,
    bgType,
    image {
      ${image}
    },
    video{
      id,
      title
    },
		theme
  },
	_type == 'cta' => {
		_type,
		_key,
		title,
		cards[] {
			${card}
		}
	},
	_type == 'hero' => {
		_type,
		_key,
		title,
		text,
		image{
			${image}
		},
		theme,
		contentPlacement
	},
	_type == 'partners' => {
		_type,
		_key,
		title,
		text,
		partnerLogos[]{
			_key,
			logo{
				${image}
			},
			href,
		},
	},
	_type == 'blog-posts' => {
		_type,
		_key,
		orderBy,
		orderBy == 'recent' => {
			"posts": *[_type == 'blog-post' && __i18n_lang == $lang] | order(publishedAt desc)[0..3] {
				${post}
			}
		},
		orderBy == 'featured' => {
			posts[] {
				${post}
			}
		}
	},
	_type == 'text-image' => {
		_type,
		_key,
		body,
    photo {
			${image}
    },
		alignment
	}
`