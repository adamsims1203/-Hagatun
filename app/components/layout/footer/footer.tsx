import { FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

import { Logo } from '~/components/app/Logo'
import { Link } from '~/components/core/link/link'
import { useRouteData } from '~/hooks/useRouteData'

import stylesUrl from './footer.css'

import type { LinksFunction } from '@remix-run/node'

const ICON = {
	Facebook: <FacebookLogo />,
	Instagram: <InstagramLogo />,
	Twitter: <TwitterLogo />,
	LinkedIn: <LinkedinLogo />,
} as const

const T = {
	'contact us': {
		en: 'contact us',
		sv: 'kontakta oss'
	},
	'offices': {
		en: 'offices',
		sv: 'kontor'
	},
	'postal address': {
		en: 'postal address',
		sv: 'post address'
	}
}

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

export const Footer = () => {
	const { page, site, lang } = useRouteData()
	
	return (
		<footer style={{ display: 'flex' }}>
			{page?.footer.blocks.map(block => 
				block._type === 'menu' ?
					<div key={block._key} className='links'>
						<h3>{block.title}</h3>
						<ul>
							{block.items?.map(subItem => 
								<li key={subItem._key}>
									<Link
										to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
									>{subItem.title}</Link>
								</li>
							)}
						</ul>
					</div>

				: block._type === 'bio' ?
					<div key={block._key}>
						<Link to={site.home.slug} className="logo">
							<Logo />
							{site.title}
						</Link>
						<p className='bio'>{block.bio}</p>
						<div className='media'>
							{block.socialLinks.map(item =>
								<Link key={item.icon} to={item.url} className={item.icon.toLowerCase()}>{ICON[item.icon as never]}</Link>
							)}
						</div>
					</div>

				: block._type === 'information' ? 
					<div key={block._key}>
						<h3>{T['contact us'][lang].toCapitalize()}</h3>
						{block.offices.map(office =>
							<div key={office._key}>
								<h4>{office.name.toCapitalize()+':'}</h4>
								<address>
									<p>{office.address}</p>
									<p><a href={`tel:${office.phoneNumber}`}>{office.phoneNumber}</a></p>
								</address>
							</div>
						)}
						<div>
							<h4>{T['postal address'][lang].toCapitalize()+':'}</h4>
							<address>
								<p>{block.postalAddress}</p>
							</address>
							<button className='primary' onClick={() => location.href=`mailto:${block.email}`}>{block.email}</button>
						</div>
					</div>

				: null
			)}
		</footer>
	)
}
