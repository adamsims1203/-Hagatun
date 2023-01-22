import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './studio/schemas'
import { structure } from './studio/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'
import { i18nConfig } from 'studio/lib/i18n'

export const config = defineConfig({
  name: 'default',
  title: 'Hagatun',

  projectId: 's50l6en8',
  dataset: 'development',
	basePath: '/studio',

  plugins: withDocumentI18nPlugin([
		deskTool({ 
			structure 
		}),
    visionTool({
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: 'development',
    }),
		media()
	], i18nConfig as unknown as Parameters<typeof withDocumentI18nPlugin>[1]),

  schema: {
    types: schemaTypes,
  },
})
