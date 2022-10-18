import { useNavigate } from '@remix-run/react'
import React from 'react'
import { useRouteData } from '~/hooks/useRouteData'

export const TranslationSelect = () => {
	const to = useNavigate()
	
	const { page } = useRouteData()
	return (
		<select onChange={e => to(e.target.value)}>
			{page?.header.translations.map(t => <option key={t.slug} value={t.slug}>{t.lang}</option>)}
		</select>
	)
}
