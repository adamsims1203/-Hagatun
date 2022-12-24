import { Cards } from "phosphor-react";
import { defineType } from "sanity";

export const blogPosts = defineType({
	type: 'object',
	name: 'blog-posts',
	title: 'Blog Posts',
	icon: Cards,
	fields: [
		{
			type: 'string',
			name: 'orderBy',
			title: 'Display order',
			options: {
				list: [
					{ title: 'Most recent', value: 'recent' },
					{ title: 'Featured selection', value: 'featured' },
				],
				layout: 'radio'
			},
		},
		{
			type: 'array',
			name: 'posts',
			title: 'Posts',
			of: [{ type: 'reference', to: { type: 'blog-post' } }],
      hidden: ({ parent }) => parent.orderBy !== 'featured'
		}
	],
	initialValue: {
		orderBy: 'recent'
	},
	preview: {
    select: {
      orderBy: 'orderBy'
    },
    prepare({ orderBy }) {
			
      return {
        title: 'Blog Posts',
				subtitle: orderBy && `ordered by ${orderBy}`,
      }
    }
  }
})
