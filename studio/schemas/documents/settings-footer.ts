import { PaperPlaneTilt, List, AnchorSimple } from 'phosphor-react'
import { defineType } from 'sanity'

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
      title: 'Block text',
      name: 'blockText1',
      type: 'text',
      group: 'column1',
		},
		{
      title: 'With donate button',
			name: 'donateButton1',
			type: 'boolean',
      group: 'column1',
			initialValue: false
		},
    {
      title: 'Block Menu',
      name: 'blockMenu2',
      type: 'reference',
      to: [{ type: 'menu' }],
      group: 'column2',
    },
    {
      title: 'Social Media Links',
      name: 'socialLinks',
      type: 'array',
			of: [
				{ type: 'socialLink' }
			],
      group: 'column2',
    },
		{
      title: 'Block text',
      name: 'blockText3',
      type: 'text',
      group: 'column3',
		},
		{
      title: 'With donate button',
			name: 'donateButton3',
			type: 'boolean',
      group: 'column3',
			initialValue: true
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
