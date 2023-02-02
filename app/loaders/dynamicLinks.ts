import { LinkDescriptor } from "@remix-run/node";
import { RouteData } from ".";

export const dynamicLinks = ({ data }: { data?: RouteData }): LinkDescriptor[] => {
	if(!data?.site) return []
	
	const siteFavicon = data.site.seo?.favicon || '/favicon.svg'
  const siteFaviconLegacy = data.site.seo?.faviconLegacy || '/favicon.ico'
	
	return <LinkDescriptor[]>[
		{ rel: 'icon', href: siteFaviconLegacy, size: 'any' },
		{ rel: 'icon', type: 'image/svg+xml', href: siteFavicon },
		{ rel: 'mask-icon', href: siteFavicon, color: '#000000' },
		...data.site.images.sitTouchIcon ? 
			[{ rel: 'apple-touch-icon', href: data.site.images.sitTouchIcon }] 
			: [],
		// https://developers.google.com/search/docs/specialty/international/localized-versions#html
		...data.page ? 
			[
				...data.page.translations.map(t =>
					({ rel: 'alternate', href: `https://${data.site.rootDomain}/${t.slug.replace(/^\//, '')}`, hrefLang: t.lang })
				),
				{ rel: 'alternate', href: `https://${data.site.rootDomain}`, hrefLang: 'x-default' }
			]
			: []
	]
}