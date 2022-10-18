import { TranslationSelect } from '~/components/app/TranslationSelect'
import { useRouteData } from '~/hooks/useRouteData'
import { Link } from '~/components/core/link/link';

import stylesUrl from './header.css'

import type { LinksFunction } from '@remix-run/node';
import { Logo } from '~/components/app/Logo';

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

export const Header = () => {
	const { page, site } = useRouteData()
	
	return (
		<header>
			<div className='navigation'>
				<div className='navigation__left'>
					<Link to={site.home.slug} className="navigation__logo">
						<Logo />
						<p>{site.title}</p>
					</Link>
				</div>
				<div className='navigation__right'>
					{page?.header.menu.items.map(item => 
						item._type === 'menu' ? 
							<div>
								<p>{item.title}</p>
								<ul>
									{item.items.map(subItem => 
										(console.log(subItem),subItem.title !== 'menu' ? 
											<li key={subItem.key}>
												<Link 
													to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
												>{subItem.title}</Link>
											</li>
											: null)
									)}
								</ul>
							</div>
						: <Link to={item._type === 'navPage' ? item.slug : item.url}>{item.title}</Link>
					)}
					<TranslationSelect />
				</div>
			</div>
		</header>
	)
}
