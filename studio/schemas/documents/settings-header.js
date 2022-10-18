import i18nconfig from 'config:@sanity/document-internationalization';
import { WarningCircle } from 'phosphor-react'

export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fields: [
    {
      name: 'navNote',
      type: 'note',
      options: {
        icon: WarningCircle,
        headline: 'Note',
        message: `On desktop, dropdowns will appear as a "mega-nav". On mobile, dropdowns will appear as accordions.`,
        tone: 'caution'
      }
    },
    {
      title: 'Main Menu',
      name: 'menu',
      type: 'reference',
      to: [{ type: 'menu' }],
			options: {
				filter: '__i18n_lang == $lang',
				filterParams: {lang: i18nconfig.base}
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
}
