import { FooterSettingsIcon } from '../../schemas/documents/settings-footer'
import { GeneralSettingsIcon } from '../../schemas/documents/settings-general'
import { HeaderSettingsIcon } from '../../schemas/documents/settings-header'
import { SeoSettingsIcon } from '../../schemas/documents/settings-seo'

import type { ListItemBuilder, StructureBuilder } from 'sanity/desk'

export const settingsMenu = (S: StructureBuilder): ListItemBuilder => S.listItem()
  .title('Settings')
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('General')
          .child(
            S.editor()
              .id('generalSettings')
              .schemaType('generalSettings')
              .documentId('generalSettings')
          )
          .icon(GeneralSettingsIcon),
        S.divider(),
        S.listItem()
          .title('Header')
          .child(
            S.editor()
              .id('headerSettings')
              .schemaType('headerSettings')
              .documentId('headerSettings')
          )
          .icon(HeaderSettingsIcon),
        S.listItem()
          .title('Footer')
          .child(
            S.editor()
              .id('footerSettings')
              .schemaType('footerSettings')
              .documentId('footerSettings')
          )
          .icon(FooterSettingsIcon),
        S.divider(),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(SeoSettingsIcon)
      ])
  )
  .icon(GeneralSettingsIcon)
