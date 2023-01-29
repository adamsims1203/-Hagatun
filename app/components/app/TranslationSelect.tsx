import { useLocation, useNavigate } from '@remix-run/react'
import { LOCALE_LABEL } from 'sanity/lib/i18n'
import { useRouteData } from '~/hooks/useRouteData'

export const TranslationSelect = () => {
	const { pathname } = useLocation()
	const { page } = useRouteData()
	const navigate = useNavigate()

	return page ? (
		<select 
			defaultValue={pathname}
			onChange={e => navigate({ pathname: e.target.value })}
		>
			{page?.header.translations.map(t => <option key={t.slug} value={t.slug}>{LOCALE_LABEL[t.lang]}</option>)}
		</select>
	) : null
}
