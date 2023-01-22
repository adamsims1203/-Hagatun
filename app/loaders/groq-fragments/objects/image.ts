import groq from 'groq'

export type ImageSrc = {
	src: string
	alt: string
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