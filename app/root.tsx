import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import { DynamicLinks } from 'remix-utils'

import { useRouteData } from "./hooks/useRouteData";

import { ThemeBody, ThemeHead, ThemeProvider } from "~/utils/theme-provider";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
					<Scripts />
					{process.env.NODE_ENV === "development" && <LiveReload />}
				</body>
			</html>
		</ThemeProvider>
  );
}

export default Root
