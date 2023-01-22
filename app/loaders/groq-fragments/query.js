import groq from 'groq'

import { page } from './documents/page'
import { blogPost } from './documents/blog-post'
import { site } from './documents/site'
import { conditionNoDraft } from './utils/conditions'
import { filterSavedPages, filterById, filterBySlug } from './utils/filters'

export const siteQuery = groq`{ ${site} }`

export const pageQueryById = groq`
	*${filterSavedPages}${filterById}[__i18n_lang == $lang][0] {
		${page}
	}
`

export const pageQueryBySlug = groq`
	*${filterSavedPages}${filterBySlug}[0] { ${page} }
`

export const blogPostQueryBySlug = groq`
	*[_type == 'blog-post' && ${conditionNoDraft}]${filterBySlug}[0] { ${blogPost} }
`

export const queryHomeID = groq`
	*[_type=="generalSettings"][0].home->_id
`

export const queryErrorID = groq`
	*[_type=="generalSettings"][0].error->_id
`
