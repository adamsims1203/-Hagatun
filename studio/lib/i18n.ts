export const LOCALE = {
	'se': 'se',
	'en': 'en',
} as const

export const LOCALE_LABEL = {
	[LOCALE.se]: 'Svenska',
	[LOCALE.en]: 'English',
} as const

export const i18nConfig = {
	base: LOCALE.se,
	stripBase: true,
	languages: Object.entries(LOCALE_LABEL).map(([id, title]) => ({ id, title })),
	fieldNames: {
		lang: '__i18n_lang',
		references: '__i18n_refs',
		baseReference: '__i18n_base'
	}
} as const

export type Locale = keyof typeof LOCALE

export const parseLocale = (locale?: unknown): Locale | undefined => LOCALE[locale as never]
export const getLocaleFromPath = <T extends boolean = typeof i18nConfig.stripBase>(path: string | undefined | null, fallback?: T) => {
	let locale: string | undefined = (path??'').replace(/^\//, "").split('/')[0]
	return (parseLocale(locale) || (fallback ?? i18nConfig.stripBase ? i18nConfig.base : undefined)) as T extends true ? Locale : Locale | undefined
}