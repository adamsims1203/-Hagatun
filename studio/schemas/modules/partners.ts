import { Handshake } from "phosphor-react";
import { defineType } from 'sanity';

export const partners = defineType({
	type: 'object',
	name: 'partners',
	title: 'Partners',
  icon: Handshake,
	fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Title',
		},
		{
			type: 'text',
			name: 'text',
			title: 'Text',
		},
		{
			type: 'array',
			name: 'partnerLogos',
			title: 'Partner Logos',
			of: [{
				type: 'object',
				name: 'partnerLogo',
				title: 'PartnerLogo',
				fields: [
					{
						type: 'image',
						name: 'logo',
						title: 'Logo',
					},
					{
						type: 'url',
						name: 'href',
						title: 'URL',
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
})
