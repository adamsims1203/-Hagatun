import { useLocation, useNavigate } from '@remix-run/react'
import { LOCALE_LABEL } from 'studio/lib/i18n'
import { useRouteData } from '~/hooks/useRouteData'

export const TranslationSelect = () => {
	const { pathname } = useLocation()
	const { page } = useRouteData()
	const to = useNavigate()

	return page ? (
		<select 
			value={pathname.replace(/^\/|\/$/, '')}
			onChange={e => to(e.target.value)}
		>
			{page?.header.translations.map(t => <option key={t.slug} value={t.slug}>{LOCALE_LABEL[t.lang]}</option>)}
		</select>
	) : null
}
