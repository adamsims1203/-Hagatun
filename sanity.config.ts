import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'
import { i18nConfig } from 'sanity/lib/i18n'
import { projectDetails } from 'sanity/projectDetails'

const details = projectDetails()

export const config = defineConfig({
  name: 'default',
  title: 'Hagatun',

  ...details,
	basePath: '/studio',

  plugins: withDocumentI18nPlugin([
		deskTool({ 
			structure 
		}),
    visionTool({
      defaultApiVersion: details.apiVersion,
      defaultDataset: details.dataset
    }),
		media()
	], i18nConfig as unknown as Parameters<typeof withDocumentI18nPlugin>[1]),

  schema: {
    types: schemaTypes,
  },
})
