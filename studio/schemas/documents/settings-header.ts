import { NavigationArrow } from 'phosphor-react'
import { defineType } from 'sanity'

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
      to: [{ type: 'menu' }]
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
