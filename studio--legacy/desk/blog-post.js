import S from '@sanity/desk-tool/structure-builder'
import i18nconfig from 'config:@sanity/document-internationalization';

import { List } from 'phosphor-react'

export const blogPostMenu = S.listItem()
  .title('Blog posts')
  .child(
		S.documentTypeList('blog-post')
			.filter(
				`_type == "blog-post" && __i18n_lang == $baseLang && !(_id in path("drafts.**"))`
			)
			.params({ baseLang: i18nconfig.base })
			.title('Blog posts')
	)
  .icon(List)
