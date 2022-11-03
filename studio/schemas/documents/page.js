import i18nconfig from 'config:@sanity/document-internationalization';

import React from 'react'
import { Browser } from 'phosphor-react'

import isUniqueAcrossAllDocuments from '../../lib/isUniqueAcrossAllDocuments';

const slugify = input =>
	input
		.toLowerCase()
		.replace('ö', 'o')
		.replace('ä', 'a')
		.replace('å', 'a')
		//Remove special characters
		.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
		.replace(/\s\s+/g, ' ')
		.replace(/\s+/g, "-")

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nconfig.base,
  },
  icon: () => <Browser />,
  groups: [
    { title: 'Content', name: 'content', default: true },
    { title: 'Settings', name: 'settings' }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'settings'
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(unique)',
			/**
			 * FIXME:
			 * This part guides the editor to properly exclude the base language from the url 
			 * It will be possible to streamline the sync between the JSON config, the studio and Remix
			 * With version 3
			 */
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
						!new RegExp(`^${document.__i18n_lang}$|^${document.__i18n_lang}/`).test(input?.current??'')
					) return `Required to start with locale; Try "${document.__i18n_lang}/${document.title.toLowerCase()}" instead`
					if(/\/$/.test(input?.current??'')) return `No trailing slash; Try "${input.current.replace(/\/$/,'')}" instead`
					return true
				})
			],
      group: 'settings'
    },
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
      title: 'Page Content',
      name: 'modules',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'marquee' },
        { type: 'dividerPhoto' },
        { type: 'cta' },
        { type: 'text-image' },
        { type: 'partners' },
        {
          title: 'Reusable Section',
          type: 'reference',
          to: [{ type: 'section' }]
        }
      ],
      group: 'content'
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug'
    },
    prepare({ title = 'Untitled', slug = {} }) {
      return {
        title,
        subtitle: slug.current || '(missing slug)'
      }
    }
  }
}
