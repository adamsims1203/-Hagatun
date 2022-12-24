import { LinkSimpleHorizontal } from 'phosphor-react'

import { validateLanguage } from '../../lib/languageValidation';

export default {
  title: 'Page',
  name: 'navPage',
  type: 'object',
  icon: LinkSimpleHorizontal,
  fields: [
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
			options: {
				filter: '',
			},
    }
  ],
	validation: validateLanguage,
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
}
