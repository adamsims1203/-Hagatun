import { PaperPlaneTilt, List, AnchorSimple } from 'phosphor-react'
import { defineType } from 'sanity'
import { i18nConfig } from 'sanity/lib/i18n'

export const FooterSettingsIcon = AnchorSimple

export const settingsFooter = defineType({
  type: 'document',
  name: 'footerSettings',
  title: 'Footer Settings',
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
			options: {
				filter: `${i18nConfig.fieldNames.baseReference} == ${i18nConfig.base}`
			},
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
			options: {
				filter: `${i18nConfig.fieldNames.baseReference} == ${i18nConfig.base}`
			},
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings'
      }
    }
  }
})
