import groq from 'groq'

import { conditionNoDraft } from'./conditions'

export const filterSavedPages = groq`
	[_type == 'page' && ${conditionNoDraft}]
`

export const filterById = groq`
	[string::startsWith(_id, string::split($id, '__i18n_')[0])]
`

export const filterBySlug = groq`
	[slug.current in [$slug, '/'+$slug, $slug+'/']]
`
