import { settingsMenu } from './desk/settings'
import { pagesMenu } from './desk/pages'
import { menusMenu } from './desk/menus'
import { postsMenu } from './desk/posts'
import { IS_PROD } from '~/utils/constants'

import type { StructureResolver, ListItemBuilder } from 'sanity/desk'

const hiddenDocTypes = (listItem: ListItemBuilder) =>
  ![
    'page',

		'blogPost',

    'generalSettings',
    'seoSettings',
    'headerSettings',
    'footerSettings',
		'section',

		'author',
		'category',
    'menu',

    'media.tag',
  ].includes(listItem.getId()||'')

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website')
    .items([
      pagesMenu(S),
      S.divider(),
			...!IS_PROD?[
				...postsMenu(S),
				S.divider(),
			]:[],
      menusMenu(S),
      S.divider(),
      settingsMenu(S),

      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
