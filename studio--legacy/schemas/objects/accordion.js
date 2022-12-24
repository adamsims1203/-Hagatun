import { CaretCircleDown } from 'phosphor-react'

export default {
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  icon: CaretCircleDown,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
