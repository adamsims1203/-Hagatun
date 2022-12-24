import i18nconfig from 'config:@sanity/document-internationalization';

import React from 'react'
import { List } from 'phosphor-react'

import { validateLanguage } from '../../lib/languageValidation';

export default {
  title: 'Menu',
  name: 'menu',
  type: 'document',
  i18n: true,
	initialValue: {
    __i18n_lang: i18nconfig.base,
  },
  icon: () => <List />,
  fields: [
		{
			name: 'title',
			title: 'Menu Title',
			type: 'string'
		},
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [
				{ type: 'navPage' }, 
				{ type: 'navLink' }, 
				{
          title: 'Menu reference',
          type: 'reference',
          to: [{ type: 'menu' }]
        }
			]
    }
  ],
	validation: validateLanguage,
  preview: {
    select: {
      title: 'title',
      items: 'items'
    },
    prepare({ title = 'Untitled', items = [] }) {
      return {
        title,
        subtitle: `${items.length} link(s)`,
        media: List
      }
    }
  }
}
