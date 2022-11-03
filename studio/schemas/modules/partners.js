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
			of: [{
				name: 'partnerLogo',
				title: 'PartnerLogo',
				type: 'object',
				fields: [
					{
						name: 'logo',
						title: 'Logo',
						type: 'image'
					},
					{
						name: 'href',
						title: 'URL',
						type: 'url',
						description: 'enter an external URL',
						validation: Rule =>
							Rule.uri({
								scheme: ['http', 'https', 'mailto', 'tel']
							})
					}
				],
				preview: {
					select: {
						href: 'href',
						logo: 'logo'
					},
					prepare({ logo, href }) {
						return {
							title: href ?? '(Unlinked)',
							media: logo 
						}
					}
				}
			}]
		}
	]
}