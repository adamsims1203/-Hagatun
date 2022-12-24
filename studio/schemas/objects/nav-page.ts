import { LinkSimpleHorizontal } from 'phosphor-react'
import { defineType } from 'sanity';

export const navPage = defineType({
  type: 'object',
  name: 'navPage',
  title: 'Page',
  icon: LinkSimpleHorizontal,
  fields: [
    {
      type: 'reference',
      name: 'page',
      title: 'Page',
      to: [{ type: 'page' }],
			options: {
				filter: '',
			},
    }
  ],
  preview: {
    select: {
      title: 'page.title',
      pageType: 'page._type',
      pageSlug: 'page.slug.current'
    },
    prepare({ title, pageSlug }) {
      return {
        title: title,
        subtitle: `/${pageSlug}`
      }
    }
  }
})
