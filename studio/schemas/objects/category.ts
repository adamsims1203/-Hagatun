import { defineType } from "sanity";

export const category = defineType({
  type: 'document',
  name: 'category',
  title: 'Category',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'text',
      name: 'description',
      title: 'Description',
    }
  ]
})