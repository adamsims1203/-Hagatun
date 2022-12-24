import { Cards } from "phosphor-react";
import React from "react";

export default {
	name: 'blog-posts',
	title: 'Blog Posts',
	type: 'object',
	icon: () => <Cards />,
	fields: [
		{
			name: 'orderBy',
			title: 'Display order',
			type: 'string',
			options: {
				list: [
					{ title: 'Most recent', value: 'recent' },
					{ title: 'Featured selection', value: 'featured' },
				],
				layout: 'radio'
			},
		},
		{
			name: 'posts',
			title: 'Posts',
			type: 'array',
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
}