import { replaceTemplateTags } from "sanity/lib/helpers"
import { RouteData } from "."

export function metadata(data?: RouteData) {
	if(!data?.site) return {}
	
	const siteTitle = data.site.title

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: data.page?.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    data.page?.seo?.metaTitle || data.site.seo?.metaTitle,
    templateTags
  )
  const metaDesc = data.page?.seo?.metaDesc || data.site.seo?.metaDesc

  const shareTitle = replaceTemplateTags(
    data.page?.seo?.shareTitle || data.site.seo?.shareTitle,
    templateTags
  )
	
  const shareDesc = data.page?.seo?.shareDesc || data.site.seo?.shareDesc

	const shareGraphic = data.page?.images.shareGraphic || data.site.images.shareGraphic
		
	return {
		title: metaTitle,
		description: metaDesc,

		...shareTitle ? {
			'og:title': shareTitle,
			'twitter:title': shareTitle
		} : null,

		...shareDesc ? {
			'og:description': shareDesc,
			'twitter:description': shareDesc
		} : null,

		...shareGraphic ? {
			'og:image': shareGraphic,
			'twitter:image': shareGraphic
		} : null,

		'og:type': 'website',
		'twitter:card': 'summary_large_image',

		'og:site_name': siteTitle
	} as const
}