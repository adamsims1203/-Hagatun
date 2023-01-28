import groq from 'groq'

import { image, ImageSrc } from './image'
import { Card, card } from './card'
import { post } from './post'
import { Theme } from '~/utils/theme-provider'
import { Post } from '../documents/blog-post'

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

export type Modules = 
	| StartPageHeroModule
	| CTAModule
	| HeroModule
	| PartnersModule
	| BlogPostsModule

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
    }
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
  _type == 'marquee' => {
    _type,
    _key,
    items[]{
      _type == 'simple' => {
        _type,
        text
      },
      _type == 'photo' => {
        _type,
        "photo": {
          ${image}
        }
      }
    },
    speed,
    reverse,
    pauseable
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${image}
    }
  }
`