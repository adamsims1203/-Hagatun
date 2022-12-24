import React from 'react'
import { SquaresFour } from 'phosphor-react'

export default {
	name: 'cta',
	title: 'Call to action',
	type: 'object',
  icon: () => <SquaresFour />,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'cards',
			title: 'Cards',
			type: 'array',
			of: [{ type: 'card' }]
		}
	]
}