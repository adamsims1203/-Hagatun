import i18nconfig from 'config:@sanity/document-internationalization';

import React from 'react'

export default {
  title: 'General Settings',
  name: 'generalSettings',
  type: 'document',
  groups: [
    { title: 'Site Details', name: 'details', default: true },
    { title: 'Company Details', name: 'company' },
    { title: 'Displays', name: 'displays' },
    { title: 'Advanced', name: 'advanced' }
  ],
  fields: [
    {
      title: 'Home Page',
      name: 'home',
      type: 'reference',
      to: [{ type: 'page' }],
			options: {
				filter: '__i18n_lang == $lang',
				filterParams: {lang: i18nconfig.base}
			},
      description: 'This page will show at the root of your domain',
      group: 'displays'
    },
    {
      title: 'Error Page (404)',
      name: 'error',
      type: 'reference',
      to: [{ type: 'page' }],
			options: {
				filter: '__i18n_lang == $lang',
				filterParams: {lang: i18nconfig.base}
			},
      description:
        'This page will show for any URL at your domain that does not exist yet',
      group: 'displays'
    },
    {
			name: 'siteTitle',
			title: 'Site Title',
			type: 'object',
			description: 'The name of your site, usually your company/brand name',
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
		},
    {
			name: 'postalAddress',
			title: 'Postal Address',
			type: 'string',
      group: 'company'
		},
    {
			name: 'email',
			title: 'Email Address',
			type: 'string',
      group: 'company'
		},
		{
			name: 'bio',
			title: 'Biography',
			type: 'object',
			fieldsets: [{
				title: 'Translations',
				name: 'translations',
				options: { collapsible: true }
			}],
			fields: i18nconfig.languages.map((lang) => ({
				title: lang.title,
				name: lang.id,
				type: 'text',
				fieldset: lang.id === i18nconfig.base ? null : 'translations'
			})),
      group: 'company'
		},
    {
			name: 'offices',
			title: 'Offices',
			type: 'array',
			of: [{ type: 'office' }],
      group: 'company'
		}
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings'
      }
    }
  },
	initialValue: {
    defaultLang: i18nconfig.base,
		stripDefaultLang: true
  }
}
