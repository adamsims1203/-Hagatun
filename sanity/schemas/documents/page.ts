import { defineField, defineType } from "sanity";
import { Browser } from "phosphor-react";

import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";
import { slugify } from "../../lib/slugify";
import { customImage } from "../../lib/custom-image";
import { i18nConfig } from "sanity/lib/i18n";

export const PageIcon = Browser

export const page = defineType({
	type: 'document',
	name: 'page',
	title: 'Page',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nConfig.base,
  },
	icon: PageIcon,
	groups: [
		{ title: 'Settings', name: 'settings' },
		{ title: 'Content', name: 'content', default: true },
		{ title: 'Thumbnail', name: 'thumbnail' }
	],
  fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Title',
			validation: Rule => Rule.required(),
			group: ['content', 'thumbnail'],
		},
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'URL Slug',
			description: '(unique)',
			options: {
				maxLength: 96,
        source: (doc) => `${doc.__i18n_lang}/${doc.title}`,
				slugify,
				isUnique: isUniqueAcrossAllDocuments,
      },
      validation: Rule => [
				Rule.required(),
				Rule.custom((input, { document }) => {
					if(
						document &&
						!new RegExp(`^${document.__i18n_lang}$|^${document.__i18n_lang}/`).test(input?.current??'')
					) return `Required to start with locale; Try "${document.__i18n_lang}/${(document.title+'').toLowerCase()}" instead`
					if(input && typeof input.current === 'string' && /\/$/.test(input.current)) return `No trailing slash; Try "${input.current.replace(/\/$/,'')}" instead`
					return true
				})
			],
			group: ['settings', 'content']
		}),
		{
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'start-page-hero' },
				{ type: 'hero' },
        { type: 'partners' },
        { type: 'blog-posts' },
				{ type: 'cta' },
				{ type: 'text-image' },
      ],
      group: 'content'
    },
		customImage({
			name: 'thumbnail',
			title: 'Thumbnail',
      group: 'thumbnail'
		}),
		{
			title: 'Overlay header with transparency?',
			name: 'hasTransparentHeader',
			type: 'boolean',
			description:
				'When activated the header will overlay the first content module with a transparent background and white text until scrolling is engaged.',
			initialValue: false,
			group: 'settings'
		},
		{
			type: 'seo',
			name: 'seo',
			title: 'SEO / Share Settings',
			group: 'settings',
		},
  ],

  
	preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'thumbnail'
    },
    prepare: v => ({
			...v,
			title: v.title ?? 'Untitled',
			subtitle: v.slug.current || '(missing slug)'
    })
  }
})
