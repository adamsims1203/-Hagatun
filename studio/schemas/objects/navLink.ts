import { ArrowSquareOut } from 'phosphor-react'
import { defineType } from 'sanity'

export const navLink = defineType({
	type: 'object',
  name: 'navLink',
  title: 'Link',
  icon: ArrowSquareOut,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'Display Text'
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      description: 'enter an external URL',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
    }
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare({ title, url }) {
      return {
        title: title ?? url,
        subtitle: title && url
      }
    }
  }
})
