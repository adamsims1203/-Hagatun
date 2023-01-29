import { Note } from "phosphor-react"
import { defineField, defineType } from "sanity"
import { i18nConfig } from "sanity/lib/i18n"
import { customImage } from "../../lib/custom-image"
import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments"
import { slugify } from "../../lib/slugify"

const BLOG_POST_PREFIX = 'blog'

export const BlogPostIcon = Note

export const blogPost = defineType({
  type: 'document',
  name: 'blogPost',
  title: 'Blog post',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nConfig.base,
  },
	icon: BlogPostIcon,
	groups: [
		{ title: 'Settings', name: 'settings' },
		{ title: 'Thumbnail', name: 'thumbnail' },
		{ title: 'Content', name: 'content', default: true },
		{ title: 'Meta', name: 'meta' },
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
				source: (doc) => `${BLOG_POST_PREFIX}/${doc.title}`,
				slugify,
				isUnique: isUniqueAcrossAllDocuments,
			},
			validation: Rule => [
				Rule.required(), 
				Rule.custom((input, { document }) => {
					if(
						!new RegExp(`^${BLOG_POST_PREFIX}$|^${BLOG_POST_PREFIX}/`).test(input?.current??'')
					) return `Required to start with ${BLOG_POST_PREFIX}; Try "${BLOG_POST_PREFIX}/${(document?.title+'').toLowerCase()}" instead`
					if(/\/$/.test(input?.current??'')) return `No trailing slash; Try "${input?.current?.replace(/\/$/,'')}" instead`
					return true
				})
			],
			group: ['settings', 'content']
		}),
    customImage({
      name: 'mainImage',
      title: 'Main image',
			validation: Rule => Rule.required(),
      group: 'content'
    }),
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content'
    },
		customImage({
			name: 'thumbnail',
			title: 'Thumbnail',
			validation: Rule => Rule.required(),
      group: 'thumbnail'
		}),
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.required().max(200),
      group: 'thumbnail'
    },
    {
      type: 'date',
      name: 'publishedAt',
      title: 'Published at',
			validation: Rule => Rule.required(),
      group: 'meta',
			initialValue: (new Date()).toISOString().split('T')[0]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      group: 'meta'
    },
    {
      type: 'array',
      name: 'categories',
      title: 'Categories',
      of: [{type: 'reference', to: {type: 'category'}}],
      group: 'meta'
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
			type: 'seo',
			name: 'seo',
			title: 'SEO / Share Settings',
			group: 'settings'
		},
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare: v => Object.assign({}, v, {
			subtitle: v.slug.current || '(missing slug)'
		})
  }
})