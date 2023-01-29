import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import groq from 'groq'

export type ImageSrc = SanityImageObject & {
	src: string
  alt: string
	id: string
	type: 'image/svg+xml' | 'image/jpeg'
	aspectRatio: number
	lqip: string
}

export const image = groq`
	"src": asset->url,
  "alt": coalesce(alt, asset->altText),
	asset,
	crop,
	customRatio,
	hotspot,
	...asset->{
		"id": assetId,
		"type": mimeType,
		"aspectRatio": metadata.dimensions.aspectRatio,
		"lqip": metadata.lqip
	}
`