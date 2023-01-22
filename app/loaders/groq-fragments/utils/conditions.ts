import groq from 'groq'

export const conditionNoDraft = groq`
	!(_id in path('drafts.**'))
`