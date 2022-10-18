import { useShouldHydrate } from 'remix-utils'
import { IconContext } from 'phosphor-react';

import { THEME, useTheme } from '~/utils/theme-provider';

import stylesUrl from './layout.css'

import type { LinksFunction } from "@remix-run/node";
import { useRouteData } from '~/hooks/useRouteData';
import { IS_PROD } from '~/utils/constants';
import { assert } from '~/utils/utils';
import { Link } from '../core/link/link';

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

interface LayoutProps extends React.PropsWithChildren {
	
}
 
function Layout({ children }: LayoutProps) {
	const { page, site } = useRouteData()
  const shouldHydrate = useShouldHydrate();
	const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.light ? THEME.dark : THEME.light
    );
  };
	
	return (
		<IconContext.Provider
			value={{
				color: theme === 'dark' ? 'white' : 'black',
				size: "1rem",
				weight: "fill",
				mirrored: false,
			}}
		>
			<header>
				<div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
					<div>
						<button 
							onClick={toggleTheme}
							title={`Toggles light & dark${!shouldHydrate?'; Requires Javascript':''}`}
							aria-label={theme??''}
							aria-live="polite"
							disabled={!shouldHydrate}

						>
							{shouldHydrate ? theme : 'Auto'}
						</button>
						<Link 
							to={site.home.slug}
						>
							Go Home
						</Link>
					</div>
					<ul style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
						{page?.header.menu.items.map(item => 
							<li key={item.key}>
								{item._type === 'menu' ? 
									<ul>
										{item.items.map(subItem => 
											subItem.title !== 'menu' ? 
												<li key={subItem.key}>
													<Link 
														to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
													>{subItem.title}</Link>
												</li>
												 : null
										)}
									</ul>
								: <Link to={item._type === 'navPage' ? item.slug : item.url}>{item.title}</Link>}
							</li>
						)}
					</ul>
					<div>{page?.header.translations.map(t => <Link key={t.slug} to={t.slug}>{t.title}</Link>)}</div>
				</div>
			</header>
			<main>
				<h1>{page?.title}</h1>
				{children}
			</main>
			<footer style={{ display: 'flex' }}>
				{page?.footer.blocks.map(block => 
					<div>
						<p></p>
						<ul>
							{block.items?.map(subItem => 
								<li key={subItem.key}>
									<Link 
										to={subItem._type === 'navPage' ? subItem.slug : subItem.url}
									>{subItem.title}</Link>
								</li>
							)}
						</ul>
					</div>
				)}
			</footer>
			{!IS_PROD && 
				<button
					style={{ position: 'fixed', left: 0, bottom: 0 }}
					onClick={() => {
						assert(site) 
						;[...site.pages].forEach(page => 
							setTimeout(() => {
								window.open(`localhost:3000${page.slug}`);
							}, 200)
						)
					}}
				>
					Open all routes
				</button>
			}
		</IconContext.Provider>
	);
}

export default Layout
