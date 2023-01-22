import { ListItemBuilder, StructureBuilder } from 'sanity/desk'
import { i18nConfig } from 'studio/lib/i18n'
import { PageIcon } from '../../schemas/documents/page'

export const pagesMenu = (S: StructureBuilder): ListItemBuilder =>
	S.listItem()
  .title('Pages')
  .id('pages')
  .child(
    S.list()
      .title('Pages')
      .items([
        S.listItem()
				.title('Static Pages')
				.schemaType('page')
				.child(S.documentTypeList('page')
					.title('Static Pages')
					.filter(
						`_type == "page" && __i18n_lang == "${i18nConfig.base}" && (_id in [
							*[_type == "generalSettings"][0].home._ref,
							*[_type == "generalSettings"][0].error._ref,
						]) && !(_id in path("drafts.**"))`
					)
					.child(async id => {
						return S.document()
							.documentId(id)
							.schemaType('page')
					})
					.canHandleIntent(
						(intent, { type }) =>
							['create', 'edit'].includes(intent) && type === 'page'
					)
				),
        S.listItem()
          .title('Other Pages')
          .schemaType('page')
          .child(S.documentTypeList('page')
						.title('Other Pages')
						.filter(
							`_type == "page" && __i18n_lang == "${i18nConfig.base}" && !(_id in [
								*[_type == "generalSettings"][0].home._ref,
								*[_type == "generalSettings"][0].error._ref,
							]) && !(_id in path("drafts.**"))`
						)
						.child(documentId =>
							S.document()
								.documentId(documentId)
								.schemaType('page')
						)
						.canHandleIntent(
							(intent, { type }) =>
								['create', 'edit'].includes(intent) && type === 'page'
						)
					),
				S.listItem()
          .title('All Pages')
          .schemaType('page')
          .child(S.documentTypeList('page')
						.title('All Pages')
						.child(documentId =>
							S.document()
								.documentId(documentId)
								.schemaType('page')
						)
						.canHandleIntent(
							(intent, { type }) =>
								['create', 'edit'].includes(intent) && type === 'page'
						)
					),
        S.divider(),
        S.listItem()
          .title('Reusable Sections')
          .schemaType('section')
          .child(
            S.documentTypeList('section')
              .title('Reusable Sections')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('section')
              )
              .canHandleIntent(
                (intent, { type }) =>
                  ['create', 'edit'].includes(intent) && type === 'section'
              )
          )
      ])
  )
  .icon(PageIcon)
