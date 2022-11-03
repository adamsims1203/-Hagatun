import { useLocation, useNavigate } from '@remix-run/react'
import { useRouteData } from '~/hooks/useRouteData'

export const TranslationSelect = () => {
	const { pathname } = useLocation()
	const { page } = useRouteData()
	const to = useNavigate()

	return (
		<select 
			value={pathname.replace(/^\/|\/$/, '')}
			onChange={e => to(e.target.value)}
		>
			{page?.header.translations.map(t => <option key={t.slug} value={t.slug}>{t.lang}</option>)}
		</select>
	)
}
