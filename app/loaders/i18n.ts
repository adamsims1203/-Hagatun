import { client } from "~/utils/sanityClient"
import { assert } from "~/utils/utils"

// needs to be in sync with:
// import config from '~/../studio/config/@sanity/document-internationalization.json'
export const i18n = {
	languages: ['sv', 'en'],
	base: 'sv',
	stripBase: true
} as const

export type Locale = typeof i18n.languages[number]
export type BaseLocale = typeof i18n.base

client.fetch<typeof i18n>(`{
	...*[_type=="generalSettings"][0].presets {
		base
	},
	"languages": array::unique(array::compact(*[].__i18n_lang))
}`).then(v =>
	assert(
		v.languages.some(l => !i18n.languages.includes(l)) ||
		i18n.languages.some(l => !v.languages.includes(l)) ||
		i18n.base !== v.base ||
		i18n.stripBase !== v.stripBase,
		`Localization in backend does't match frontend configuration`
	)
)
export const validateLocale = (locale: string | undefined | null) => i18n.languages.find(l => l === locale)
export const getLocaleFromPath = (path: string | undefined | null, fallback: boolean = i18n.stripBase) => {
	let locale = validateLocale((path??'').replace(/^\//, "").split('/')[0])
	fallback && (locale ||= i18n.base)
	return locale
}
