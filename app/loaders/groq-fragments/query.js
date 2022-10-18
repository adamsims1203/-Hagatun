import groq from 'groq'

import { page } from './documents/page'
import { site } from './documents/site'
import { filterSavedPages, filterById, filterBySlug } from './utils/filters'

export const siteQuery = groq`{ ${site} }`

export const pageQueryById = groq`
	*${filterSavedPages}${filterById}[0] {
		${page}
	}
`

export const pageQueryBySlug = groq`
	*${filterSavedPages}${filterBySlug}[0] { ${page} }
`

export const queryHomeID = groq`
	*[_type=="generalSettings"][0].home->_id
`

export const queryErrorID = groq`
	*[_type=="generalSettings"][0].error->_id
`
