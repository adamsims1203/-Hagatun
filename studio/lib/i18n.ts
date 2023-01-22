export const i18nConfig = {
	base: 'se',
	stripBase: true,
	languages: [
		{
			title: 'Swedish (SE)',
			id: 'se'
		},
		{
			title: 'English (EN)',
			id: 'en'
		},
	],
	fieldNames: {
		lang: '__i18n_lang',
		references: '__i18n_refs',
		baseReference: '__i18n_base'
	}
} as const

export type Locale = typeof i18nConfig.languages[number]['id']
export type BaseLocale = typeof i18nConfig.base

export const validateLocale = (locale: string | undefined | null) => i18nConfig.languages.find(l => l.id === locale)?.id
export const getLocaleFromPath = (path: string | undefined | null, fallback: boolean = i18nConfig.stripBase) => {
	let locale = validateLocale((path??'').replace(/^\//, "").split('/')[0])
	return locale || (fallback ? i18nConfig.base : undefined)
}