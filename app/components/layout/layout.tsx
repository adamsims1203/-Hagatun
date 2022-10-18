import { IconContext } from 'phosphor-react';

import { useRouteData } from '~/hooks/useRouteData';
import { Link } from '~/components/core/link/link';
import { Header, links as headerLinks } from './header/header';

import stylesUrl from './layout.css'

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: stylesUrl },
		...headerLinks()
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
				<section>
					<h1>{page?.title}</h1>
				</section>
				{children}
			</main>
			<footer style={{ display: 'flex' }}>
				{page?.footer.blocks.map(block => 
					<div>
						<p>{block.title}</p>
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
