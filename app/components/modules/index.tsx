import React from 'react'

import Hero, { links as heroLinks } from './hero/hero'

import type { LinksFunction, MetaFunction } from '@remix-run/node'
import type { Modules } from '~/loaders'

export const links: LinksFunction = () => {
	return [
		...heroLinks()
	]
}

export const meta: MetaFunction = (props) => {
	return {

	}
}

export const hydrate = true

export interface ModuleProps {
	index: number
	data: Modules
	activeVariant?: unknown
	onVariantChange?: unknown
}

export const Module = ({
  index,
  data,
  activeVariant,
  onVariantChange,
}: ModuleProps) => {
  const ModuleType: React.FunctionComponent<ModuleProps> = ({
    hero: Hero,
  }[data?._type as never] ?? <></>)

  return (
    <ModuleType
      index={index}
      data={data}
      activeVariant={activeVariant}
      onVariantChange={onVariantChange}
    />
  )
}
