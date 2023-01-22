import groq from 'groq'

export const conditionNoDraft = groq`
	!(_id in path('drafts.**'))
`

export const filterSavedPages = groq`
	[_type == 'page' && ${conditionNoDraft}]
`

export const filterById = groq`
	[string::startsWith(_id, string::split($id, '__i18n_')[0])]
`

export const filterBySlug = groq`
	[slug.current in [$slug, '/'+$slug, $slug+'/']]
`
