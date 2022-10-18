import React, { useState } from 'react'
import axios from 'axios'

import sanityClient from 'part:@sanity/base/client'

import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
  DeleteAction
} from 'part:@sanity/base/document-actions'

import { useToast } from '@sanity/ui'

import { Eye, Storefront } from 'phosphor-react'

const singletons = [
  'generalSettings',
  'cookieSettings',
  'promoSettings',
  'headerSettings',
  'footerSettings',
  'shopSettings',
  'seoSettings'
]

const previews = ['page']

const PreviewAction = props => {
  const slug = props.draft
    ? props.draft.slug?.current
    : props.published?.slug?.current

  return {
    label: 'Open Preview',
    icon: () => <Eye weight="light" data-sanity-icon="eye" />,
    onHandle: async () => {
      const localURL = 'http://localhost:3000'
      const remoteURL = await sanityClient.fetch(
        '*[_type == "generalSettings"][0].siteURL'
      )

      const frontendURL =
        window.location.hostname === 'localhost' ? localURL : remoteURL

      window.open(
        `${frontendURL}/api/preview?token=HULL&type=${props.type}&slug=${slug ||
          ''}`
      )
    }
  }
}

export default function resolveDocumentActions(props) {
  const isSingle = singletons.indexOf(props.type) > -1
  const canPreview = previews.indexOf(props.type) > -1

  if (isSingle) {
    return [
      PublishAction,
      DiscardChangesAction,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }

  return [...defaultResolve(props), ...(canPreview ? [PreviewAction] : [])]
}
