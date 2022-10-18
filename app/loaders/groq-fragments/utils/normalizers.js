import groq from 'groq'
import { i18n } from '../../i18n'

export const normalizeSlug = groq`coalesce(string::split(slug.current, '${i18n.base}')[1], slug.current)`
