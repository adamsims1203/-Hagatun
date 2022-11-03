import React from 'react'
import { Handshake } from "phosphor-react";

export default {
	name: 'partners',
	title: 'Partners',
	type: 'object',
  icon: Handshake,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'text',
			title: 'Text',
			type: 'text'
		},
		{
			name: 'partnerLogos',
			title: 'Partner Logos',
			type: 'array',
			of: [{ type: 'image' }]
		}
	]
}