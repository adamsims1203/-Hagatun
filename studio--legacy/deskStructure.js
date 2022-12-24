import S from '@sanity/desk-tool/structure-builder'

import { settingsMenu } from './desk/settings'
import { pagesMenu } from './desk/pages'
import { menusMenu } from './desk/menus'
import { blogPostMenu } from './desk/blog-post'

const hiddenDocTypes = listItem =>
  ![
    'page',
    'blog-post',
    'section',

    'generalSettings',
    'contactSettings',
    'cookieSettings',
    'promoSettings',
    'headerSettings',
    'footerSettings',
    'seoSettings',

    'menu',
		'author',
		'category',
    'siteSettings',
    'media.tag' // for media plugin
  ].includes(listItem.getId())

export default () =>
  S.list()
    .title('Website')
    .items([
      pagesMenu,
      S.divider(),
			blogPostMenu,
      S.divider(),
      menusMenu,
      S.divider(),
      settingsMenu,

      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
