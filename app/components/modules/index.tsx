import React from 'react'

import StartPageHero, { links as startPageHeroLinks } from './start-page-hero/start-page-hero'
import CTA, { links as ctaLinks } from './cta/cta'
import Partners, { links as partnersLinks } from './partners/partners'
import TextImage, { links as textImageLinks } from './text-image/text-image'

import type { LinksFunction, MetaFunction } from '@remix-run/node'
import type { Modules } from '~/loaders'

export const links: LinksFunction = () => {
	return [
		...startPageHeroLinks(),
		...ctaLinks(),
		...textImageLinks(),
		...partnersLinks()
	]
}

export const meta: MetaFunction = (props) => {
	return {

	}
}

export const hydrate = true

export interface ModuleProps<T extends Modules['_type'] = Modules['_type']> {
  index: number;
  data: Extract<Modules, { _type: T }>;
  activeVariant?: unknown;
  onVariantChange?: unknown;
}

const modules = {
  'start-page-hero': StartPageHero,
	cta: CTA,
	partners: Partners,
	'text-image': TextImage,
} as { [k in Modules['_type']]: React.FunctionComponent<ModuleProps> };

export const Module = ({
  index,
  data,
  activeVariant,
  onVariantChange,
}: ModuleProps) => {
	const ModuleType = modules[data._type]

  return ModuleType ? (
    <ModuleType
      index={index}
      data={data}
      activeVariant={activeVariant}
      onVariantChange={onVariantChange}
    />
  ) : null;
}
