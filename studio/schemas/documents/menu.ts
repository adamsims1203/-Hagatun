import { List } from 'phosphor-react'
import { defineType } from 'sanity'

export const MenuIcon = List

export const menu = defineType({
  type: 'document',
  name: 'menu',
  title: 'Menu',
  i18n: true,
  icon: MenuIcon,
  fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Menu Title',
		},
    {
      type: 'array',
      name: 'items',
      title: 'Items',
      of: [
				{ type: 'navPage' }, 
				{ type: 'navLink' }, 
				{
          type: 'reference',
          title: 'Menu reference',
          to: [{ type: 'menu' }]
        }
			]
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items'
    },
    prepare: v => ({
			title: v.title || 'Untitled',
			subtitle: `${v.items.length} link(s)`,
			media: List
    })
  }
})
