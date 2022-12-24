import S from '@sanity/desk-tool/structure-builder'
import { IntentLink, Link } from 'part:@sanity/base/router'
import i18nconfig from 'config:@sanity/document-internationalization';

import React from 'react'
import { Card, Stack, Text } from '@sanity/ui'
import { Browser } from 'phosphor-react'

import { standardViews } from './previews/standard'

const EmptyNotice = ({ title, type, link, linkTitle }) => {
  if (!title || !type || !link || !linkTitle) return null

  return (
    <Card padding={4}>
      <Card padding={[5]} radius={2} shadow={1} tone="critical">
        <Stack space={[3]}>
          <Text align="center" size={[2]} weight="semibold">
            The {title} has not been set.
          </Text>
          <Text align="center" size={[2]}>
            Set your {title} from the <Link href={link}>{linkTitle}</Link>
          </Text>
        </Stack>
      </Card>

      <Stack padding={3} space={[3]}>
        <Text align="center" muted size={[1]}>
          Don't have a {type} yet?{' '}
          <IntentLink intent="create" params={{ type }}>
            Create one now
          </IntentLink>
        </Text>
      </Stack>
    </Card>
  )
}

export const pagesMenu = S.listItem()
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
						`_type == "page" && __i18n_lang == $baseLang && _id in [
							*[_type == "generalSettings"][0].home._ref,
							*[_type == "generalSettings"][0].error._ref,
						] && !(_id in path("drafts.**"))`
					)
					.params({ baseLang: i18nconfig.base })
					.child(async id => {

						if (!id)
							return S.component(() => (
								<EmptyNotice
									title="Home Page"
									type="page"
									link="settings;general"
									linkTitle="General Settings"
								/>
							)).title('Home Page')

						return S.document()
							.documentId(id)
							.schemaType('page')
							.views(standardViews)
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
							`_type == "page" && __i18n_lang == $baseLang && !(_id in [
								*[_type == "generalSettings"][0].home._ref,
								*[_type == "generalSettings"][0].error._ref,
							]) && !(_id in path("drafts.**"))`
						)
						.params({ baseLang: i18nconfig.base })
						.child(documentId =>
							S.document()
								.documentId(documentId)
								.schemaType('page')
								.views(standardViews)
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
								.views(standardViews)
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
                  .views(standardViews)
              )
              .canHandleIntent(
                (intent, { type }) =>
                  ['create', 'edit'].includes(intent) && type === 'section'
              )
          )
      ])
  )
  .icon(Browser)
