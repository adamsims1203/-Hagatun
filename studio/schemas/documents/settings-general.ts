import { Gear } from 'phosphor-react'
import { defineType } from 'sanity'

export const GeneralSettingsIcon = Gear

export const settingsGeneral = defineType({
  title: 'General Settings',
  name: 'generalSettings',
  type: 'document',
  groups: [
    { title: 'Site Details', name: 'details', default: true },
    { title: 'Displays', name: 'displays' },
    { title: 'Advanced', name: 'advanced' }
  ],
  fields: [
    {
      title: 'Home Page',
      name: 'home',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'This page will show at the root of your domain',
      group: 'displays'
    },
    {
      title: 'Error Page (404)',
      name: 'error',
      type: 'reference',
      to: [{ type: 'page' }],
      description:
        'This page will show for any URL at your domain that does not exist yet',
      group: 'displays'
    },
    {
			name: 'siteTitle',
			title: 'Site Title',
			type: 'object',
			description: 'The name of the site',
			fields: [
				{
					title: 'Long',
					name: 'long',
					description: 'Long form title; Used where appropriate',
					type: 'string',
				},
				{
					title: 'Short',
					name: 'short',
					description: 'Short form title; Used where appropriate',
					type: 'string',
				},
			],
			group: 'details'
		},
    {
      title: 'Live Site URL',
      description: 'The root domain or subdomain of your website',
      name: 'siteURL',
      type: 'url',
      validation: Rule => Rule.required(),
      group: 'details'
    },
    {
      title: 'Google Tag Manager (GTM)',
      description: 'To enable GTM enter your Container ID',
      name: 'gtmID',
      type: 'string',
      group: 'advanced'
    },
		{
			name: 'presets',
			title: 'Developer Presets',
      description: 'Can only be changed by a developer',
			type: 'object',
			fields: [
				{
					title: 'Default language',
					name: 'defaultLang',
					type: 'string',
					readOnly: true
				},
				{
					title: 'Strip default language',
					name: 'stripDefaultLang',
					description: 'Remove default language from url',
					type: 'boolean'
				}
			],
      group: 'advanced',
			options: { collapsible: true }
		}
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings'
      }
    }
  }
})
