import React from 'react'
import { defineType } from 'sanity'
import { Broadcast } from 'phosphor-react'

export const section = defineType({
  title: 'Reusable Section',
  name: 'section',
  type: 'document',
  icon: Broadcast,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        'Provide a name to reference this section. For internal use only.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        { type: 'start-page-hero' }
      ],
      validation: Rule =>
        Rule.length(1).error('You can only have one piece of content')
    }
  ],
  preview: {
    select: {
      name: 'name',
      content: 'content.0'
    },
    prepare: v => ({
			title: v.name,
			subtitle: v.content._type
    })
  }
})
