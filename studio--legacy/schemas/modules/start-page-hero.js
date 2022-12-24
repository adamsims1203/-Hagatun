import { Star } from 'phosphor-react'

import customImage from '../../lib/custom-image'

export default {
  name: 'start-page-hero',
  title: 'Start Page Hero',
  type: 'object',
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
      name: 'photos',
      type: 'object',
      fields: [
        customImage({
          title: 'Background Photo (mobile)',
          name: 'mobilePhoto'
        }),
        customImage({
          title: 'Background Photo (desktop)',
          name: 'desktopPhoto'
        })
      ],
      hidden: ({ parent }) => {
        return parent.bgType !== 'photo'
      }
    },
    {
      name: 'video',
      type: 'object',
      fields: [
        {
          title: 'Background Video',
          name: 'id',
          type: 'string',
          description:
            'Alternatively, enter a vimeo ID to show a looping video instead'
        },
        {
          title: 'Background Video Title',
          name: 'title',
          type: 'string',
          description: 'Short title/description of the video'
        }
      ],
      hidden: ({ parent }) => {
        return parent.bgType !== 'video'
      }
    }
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
}
