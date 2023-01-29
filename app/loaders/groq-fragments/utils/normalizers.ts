import groq from 'groq'
import { i18nConfig } from '../../../../sanity/lib/i18n'

export const normalizeSlug = groq`coalesce(string::split(slug.current, '${i18nConfig.base}')[1], slug.current)`
