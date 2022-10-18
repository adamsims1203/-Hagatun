import React from 'react'

import {
	FacebookLogo,
	InstagramLogo,
	TwitterLogo,
	LinkedinLogo,
} from 'phosphor-react'

export const getIcon = icon => {
  switch (icon) {
    case 'Facebook':
      return { Icon: FacebookLogo, color: '#1877F2' }
    case 'Instagram':
      return { Icon: InstagramLogo, color: '#EC3397' }
    case 'Twitter':
      return { Icon: TwitterLogo, color: '#1DA1F2' }
    case 'Likedin':
      return { Icon: LinkedinLogo, color: '#0A66C2' }
    default:
      return false
  }
}

export default {
  title: 'Social Link',
  name: 'socialLink',
  type: 'object',
  options: {
    columns: 2,
    collapsible: false
  },
  fields: [
    {
      title: 'Icon',
      name: 'icon',
      type: 'string',
      options: {
        list: [
          { title: 'Facebook', value: 'Facebook' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'Twitter', value: 'Twitter' },
          { title: 'Linkedin', value: 'Linkedin' }
        ]
      }
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url'
    }
  ],
  preview: {
    select: {
      icon: 'icon',
      url: 'url'
    },
    prepare({ icon, url }) {
      return {
        title: icon,
        subtitle: url ? url : '(url not set)',
        media: (props) => {
					const { Icon, color } = getIcon(icon)
					return <Icon size={props.dimensions.width} weight="fill" color={color} />
				}
      }
    }
  }
}
