import { PropsWithChildren } from "react";

import stylesUrl from './layout.css'

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};


interface LayoutProps extends PropsWithChildren {
	
}
 
function Layout({ children }: LayoutProps) {
	return (
		<>
			<header></header>
			<main>{children}</main>
			<footer></footer>
		</>
	);
}

export default Layout
