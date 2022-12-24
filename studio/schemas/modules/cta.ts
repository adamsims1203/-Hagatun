import { SquaresFour } from 'phosphor-react'
import { defineType } from 'sanity'

export const cta =  defineType({
	type: 'object',
	name: 'cta',
	title: 'Call to action',
  icon: SquaresFour,
	fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Title',
		},
		{
			type: 'array',
			name: 'cards',
			title: 'Cards',
			of: [{ type: 'card' }]
		}
	]
})
