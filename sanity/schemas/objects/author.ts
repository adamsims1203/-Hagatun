import { defineType } from "sanity";

export const author = defineType({
  type: 'document',
  name: 'author',
  title: 'Author',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    },
    {
      type: 'array',
      name: 'bio',
      title: 'Bio',
      of: [
        {
          type: 'block',
          title: 'Block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: []
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
})