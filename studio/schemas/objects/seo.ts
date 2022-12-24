import { defineType } from "sanity"

export const seo = defineType({
  type: 'object',
  name: 'seo',
  title: 'SEO / Share Settings',
  options: {
    collapsible: true
  },
  fields: [
    {
      type: 'string',
      name: 'metaTitle',
      title: 'Meta Title',
      description: 'Title used for search engines and browsers',
      validation: Rule =>
        Rule.max(50).warning('Longer titles may be truncated by search engines')
    },
    {
      type: 'text',
      name: 'metaDesc',
      title: 'Meta Description',
      rows: 3,
      description: 'Description for search engines',
      validation: Rule =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        )
    },
    {
      type: 'string',
      name: 'shareTitle',
      title: 'Share Title',
      description: 'Title used for social sharing cards',
      validation: Rule =>
        Rule.max(50).warning('Longer titles may be truncated by social sites')
    },
    {
			type: 'text',
      name: 'shareDesc',
      title: 'Share Description',
      rows: 3,
      description: 'Description used for social sharing cards',
      validation: Rule =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by social sites'
        )
    },
    {
      type: 'image',
      name: 'shareGraphic',
      title: 'Share Graphic',
      description: 'Recommended size: 1200x630 (PNG or JPG)'
    }
  ]
})
