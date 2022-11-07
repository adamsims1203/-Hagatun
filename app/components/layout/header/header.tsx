
import React, { useEffect, useState } from 'react';
import { CaretDown, List, X } from 'phosphor-react';

import { TranslationSelect } from '~/components/app/TranslationSelect'
import { useRouteData } from '~/hooks/useRouteData'
import { Link } from '~/components/core/link/link';
import { Logo } from '~/components/app/Logo';

import stylesUrl from './header.css'

import type { LinksFunction } from '@remix-run/node';
import { clsx } from '~/utils/utils';


export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

export const Header = () => {
	const { page, post, site } = useRouteData()
	const routeData = page ?? post
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const list = document.querySelector('.navigation__dropdown')!
			const button = document.querySelector('.navigation__left button')!
			
			if(list.contains(e.target as never) || button.isSameNode(e.target as never)) return

			setOpen(false)
		}

		document.addEventListener('click', onClick)
		return () => {
			document.removeEventListener('click', onClick)
		}
	}, [])
	
	return (
		<header>
			<div className='navigation'>
				<div className='navigation__left'>
					<Link to={site.home.slug} className="navigation__logo">
						<Logo />
						<p>{site.title}</p>
					</Link>
					<button onClick={() => setOpen(v => !v)}>{!open ? <List /> : <X />}</button>
				</div>
				<div className='navigation__right'>
					{routeData?.header.menu.items.map(item => 
						item._type === 'menu' ?
								<div key={item._key}>
									<p tabIndex={0} aria-haspopup>{item.title} <CaretDown  /></p>
									<ul>
										{item.items.map(subItem => 
											subItem.title !== 'menu' ? 
												<li key={subItem._key}>
													<Link 
														to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
													>{subItem.title}</Link>
												</li>
											: null
										)}
									</ul>
								</div>
						: <div key={item._key}><Link to={item._type === 'navPage' ? item.slug : item.url}>{item.title}</Link></div>
					)}
					<TranslationSelect />
				</div>
				<div className={clsx(
					'navigation__dropdown',
					open && 'open'
				)}>
					<TranslationSelect />
					{routeData?.header.menu.items.map(item => 
						item._type === 'menu' ? 
							<details key={item._key}>
								<summary>{item.title}<CaretDown /></summary>
								<ul>
									{item.items.map(subItem => 
										subItem.title !== 'menu' ? 
											<li key={subItem._key}>
												<Link 
													to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
												>{subItem.title}</Link>
											</li>
										: null
									)}
								</ul>
							</details>
						: <Link key={item._key} to={item._type === 'navPage' ? item.slug : item.url}>{item.title}</Link>
					)}
				</div>
			</div>
		</header>
	)
}
