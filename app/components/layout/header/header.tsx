
import React, { useMemo } from 'react';
import { CaretDown, List, X } from 'phosphor-react';
import * as Drawer from '@accessible/drawer'

import { useRouteData } from '../../../hooks/useRouteData'
import { Link } from '~/components/core/link/link';
import { Logo } from '~/components/app/Logo';
import { TranslationSelect } from '~/components/app/TranslationSelect';
import { ThemeButton } from '~/components/app/ThemeButton';

import stylesUrl from './header.css'

import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

export const Header = () => {
	const { site } = useRouteData()
	console.log(site)
	const navList = useMemo(() => (
		site?.header.menu?.items?.map(item => 
			item._type === 'menu' ?
				<div key={item._key} className="navigation__list-item">
					<p aria-haspopup>{item.title} <CaretDown /></p>
					<ul>
						{item.items?.map(subItem => 
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
		)
	), [site?.header])
	
	return (
		<header>
			<div className='navigation'>
				<div className='navigation__left'>
					<Logo className='navigation__logo' />
					<HeaderDrawer>
						{site.presets.languageSelect && <TranslationSelect />}
						{navList}
					</HeaderDrawer>
				</div>
				<nav 
					className='navigation__right'
					aria-label="Main menu"
				>
					{navList}
					{site.presets.languageSelect && <TranslationSelect />}
					{site.presets.themeSwitch && <ThemeButton />}
				</nav>
			</div>
		</header>
	)
}

const HeaderDrawer = ({ children }: React.PropsWithChildren) => {
	return (
		<>
			<span hidden id="menu-label">Main menu</span>
			<Drawer.Drawer>
				<Drawer.Trigger>
					<button 
						aria-label="Open menu"
						className='menu-button'
					><List /></button>
				</Drawer.Trigger>

				<Drawer.Target
					placement='right'
					portal
					preventScroll
					closeOnEscape
				>
					<div className='navigation__drawer'>
						<Drawer.CloseButton>
							<button 
								aria-label="Close menu"
								className='menu-button'
							><X /></button>
						</Drawer.CloseButton>

						{children}
					</div>
				</Drawer.Target>
			</Drawer.Drawer>
		</>
	)
}