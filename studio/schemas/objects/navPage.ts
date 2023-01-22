import { LinkSimpleHorizontal } from 'phosphor-react'
import { defineField, defineType } from 'sanity';
import { i18nConfig } from 'studio/lib/i18n';

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
				filter: ({ document }) => ({
					filter: `${i18nConfig.fieldNames.lang} == "${document.__i18n_lang}"` as any
				})
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
