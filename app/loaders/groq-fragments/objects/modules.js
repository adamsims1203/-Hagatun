import groq from 'groq'

import { image } from './image'
import { card } from './card'
import { post } from './post'

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