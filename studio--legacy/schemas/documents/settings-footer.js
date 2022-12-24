import i18nconfig from 'config:@sanity/document-internationalization';
import sanityClient from 'part:@sanity/base/client'

import { PaperPlaneTilt, List } from 'phosphor-react'

export default {
  title: 'Footer Settings',
  name: 'footerSettings',
  type: 'document',
  groups: [
    {
      title: 'Block 1',
      name: 'column1',
      icon: PaperPlaneTilt,
      default: true
    },
    {
      title: 'Block 2',
      name: 'column2',
      icon: List
    },
    {
      title: 'Block 3',
      name: 'column3',
      icon: List
    }
  ],
  fields: [
    {
      title: 'Social Media Links',
      name: 'socialLinks',
      type: 'array',
			of: [
				{ type: 'socialLink' }
			],
      group: 'column1',
    },
		{
      title: 'Block Title',
      name: 'blockTitle2',
      type: 'string',
      group: 'column2'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu2',
      type: 'reference',
      to: [{ type: 'menu' }],
      group: 'column2',
    },
    {
      title: 'Block Title',
      name: 'blockTitle3',
      type: 'string',
      group: 'column3'
    },
    {
      title: 'Block Menu',
      name: 'blockMenu3',
      type: 'reference',
      to: [{ type: 'menu' }],
      group: 'column3',
			validation: Rule => [
				Rule.custom(async (ref, { document }) => {
					if(!ref) return true
					const r = (await sanityClient.fetch(`*[_id == $id]`, {
						id: ref._ref
					})).find(item => item.__i18n_lang !== i18nconfig.base)
					
					return !r || `
						Wrong language: 
							Reference "${r.title}" is in ${i18nconfig.languages.find(l => l.id === r.__i18n_lang).title.toLowerCase()} 
							but needs to be in ${i18nconfig.languages.find(l => l.id === i18nconfig.base).title.toLowerCase()} 
					`
				})
			]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
}
