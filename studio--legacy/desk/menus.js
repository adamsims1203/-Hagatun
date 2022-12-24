import S from '@sanity/desk-tool/structure-builder'
import i18nconfig from 'config:@sanity/document-internationalization';

import { List } from 'phosphor-react'

export const menusMenu = S.listItem()
  .title('Menus')
  .child(
		S.documentTypeList('menu')
			.filter(
				`_type == "menu" && __i18n_lang == $baseLang && !(_id in path("drafts.**"))`
			)
			.params({ baseLang: i18nconfig.base })
			.title('Menus')
	)
  .icon(List)
