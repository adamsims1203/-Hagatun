import { NavigationArrow } from 'phosphor-react'
import { defineType } from 'sanity'
import { i18nConfig } from 'studio/lib/i18n'

export const HeaderSettingsIcon = NavigationArrow

export const settingsHeader = defineType({
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fields: [
    {
      title: 'Main Menu',
      name: 'menu',
      type: 'reference',
      to: [{ type: 'menu' }],
			options: {
				filter: `${i18nConfig.fieldNames.lang} == "${i18nConfig.base}"`
			},
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings'
      }
    }
  }
})
