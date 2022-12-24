import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './studio/schemas'
import { structure } from './studio/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'

export const i18nConfig = {
	base: 'sv',
	languages: [
		{
			title: 'Swedish (SW)',
			id: 'sv'
		},
		{
			title: 'English (EN)',
			id: 'en'
		}
	],
	fieldNames: {
		lang: '__i18n_lang',
		references: '__i18n_refs',
		baseReference: '__i18n_base'
	}
}

export default defineConfig({
  name: 'default',
  title: 'Hagatun',

  projectId: 's50l6en8',
  dataset: 'production',
	basePath: '/studio',


  plugins: withDocumentI18nPlugin([
		deskTool({ 
			structure 
		}),
    visionTool({
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: 'production',
    }),
		media()
	], i18nConfig),

  schema: {
    types: schemaTypes,
  },
})
