import i18nconfig from 'config:@sanity/document-internationalization';

import isUniqueAcrossAllDocuments from "../../lib/isUniqueAcrossAllDocuments"
import { slugify } from "../../lib/slugify"

export default {
  name: 'blog-post',
  title: 'Blog post',
  type: 'document',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nconfig.base,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        source: (doc) => `${doc.__i18n_lang}/blog/${doc.title}`,
				slugify,
				isUnique: isUniqueAcrossAllDocuments,
      },
      validation: Rule => [
				Rule.required(),
				Rule.custom((input, { document }) => {
					const title = slugify(document.title).toLowerCase()
					if(
						!new RegExp(`^${document.__i18n_lang}/`).test(input?.current??'')
					) return `Required to start with locale; Try "${document.__i18n_lang}/${title}" instead`
					if(
						!new RegExp(`^${document.__i18n_lang}/blog`).test(input?.current??'')
					) return `Required to start with locale followed by "blog"; Try "${document.__i18n_lang}/blog/${title}" instead`
					if(/\/$/.test(input?.current??'')) return `No trailing slash; Try "${input.current.replace(/\/$/,'')}" instead`
					return true
				})
			],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date'
    },
    {
      name: "excerpt",
      title: "Excerpt",
      description:
        "The excerpt is used in blog feeds, and also for search results",
      type: "text",
      rows: 3,
      validation: Rule => Rule.max(200)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author, slug = {}} = selection
      return Object.assign({}, selection, {
        subtitle: slug.current || '(missing slug)'
      })
    }
  }
}