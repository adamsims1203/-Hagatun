import { Star } from 'phosphor-react'
import { defineType } from 'sanity'
import { customImage } from 'sanity/lib/custom-image'

export const startPageHero = defineType({
  type: 'object',
  name: 'start-page-hero',
  title: 'Start Page Hero',
  icon: Star,
  fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		},
    {
      title: 'Background Type',
      name: 'bgType',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'photo' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      validation: Rule => Rule.required()
    },
    {
      ...customImage({ name: 'image', title: 'Background Image' }),
      hidden: ({ parent }) => {
        return parent.bgType !== 'photo'
      }
    },
    {
			name: 'videoFile',
			title: 'Background Video',
			type: 'file',
			options: {
				accept: 'video/*'
			},
      hidden: ({ parent }) => {
        return parent.bgType !== 'video'
      }
    },
		{
			type: 'string',
			name: 'theme',
			title: 'Theme',
			options: {
				list: [
					{title: 'Light', value: 'light'},
					{title: 'Dark', value: 'dark'}
				],
				layout: 'radio'
			},
      hidden: ({ parent }) => {
        return parent.bgType !== 'photo'
      }
		},
  ],
  preview: {
    select: {
      photo: 'photo',
      content: 'content.0.children'
    },
    prepare({ photo, content }) {
      return {
        title: 'Start Page Hero',
        subtitle: content && content[0]?.text,
        media: photo
      }
    }
  }
})
