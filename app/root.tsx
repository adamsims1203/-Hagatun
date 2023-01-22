import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { useShouldHydrate, DynamicLinks } from 'remix-utils'

import { useRouteData } from "./hooks/useRouteData";

import stylesUrl from "~/styles/global.css";

import { ThemeBody, ThemeHead, ThemeProvider } from "~/utils/theme-provider";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: stylesUrl }
  ];
};

export const meta: MetaFunction = () => {
	return { 
		name: 'viewport', 
		content: 'width=device-width, initial-scale=1' 
	}
}


function Root({ title }: {title?: string}) {
	const { theme, lang } = useRouteData()
  const shouldHydrate = useShouldHydrate();
	
  return (
    <ThemeProvider specifiedTheme={theme}>
			<html lang={lang}>
				<head>
					{title && <title>{title}</title>}
					<Meta />
					<Links />
					<DynamicLinks />
					<ThemeHead ssrTheme={Boolean(theme)} />
				</head>
				<body>
					<Outlet />
					<ThemeBody ssrTheme={Boolean(theme)} />
					<ScrollRestoration />
					{/* Render Scripts if shouldHydrate is true */}
					{shouldHydrate && <Scripts />}
					{process.env.NODE_ENV === "development" && <LiveReload />}
				</body>
			</html>
		</ThemeProvider>
  );
}

export default Root
