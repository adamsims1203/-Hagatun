import { IconContext } from 'phosphor-react';

import { useRouteData } from '~/hooks/useRouteData';
import { Header, links as headerLinks } from './header/header';
import { Footer, links as footerLinks } from './footer/footer';

import stylesUrl from './layout.css'

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
		...headerLinks(),
		...footerLinks()
	];
};

interface LayoutProps extends React.PropsWithChildren {
	
}
 
function Layout({ children }: LayoutProps) {
	const { page } = useRouteData()
	
	return (
		<IconContext.Provider
			value={{
				size: "1rem",
				weight: "fill",
				mirrored: false,
			}}
		>
			<Header />
			<main>
				{children}
			</main>
			<Footer />
			{/* {!IS_PROD && 
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
			} */}
		</IconContext.Provider>
	);
}

export default Layout
