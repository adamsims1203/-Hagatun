import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
	useCatch,
	useLoaderData
} from "@remix-run/react";
import { LoaderArgs, LinksFunction, Response } from "@remix-run/node";
import { useShouldHydrate, DynamicLinks } from 'remix-utils'
import { SmileySad } from "phosphor-react";

import { ThemeBody, ThemeHead, ThemeProvider } from "~/utils/theme-provider";
import Layout, { links as layoutLinks } from "~/components/layout/layout";
import { links as moduleLinks } from "~/components/modules";

import stylesUrl from "~/styles/global.css"; 
import { loadTheme } from "./utils/theme.server";
import { merge } from "./utils/utils";
import { getSite } from "./loaders";
import { useRouteData } from "./hooks/useRouteData";

export const links: LinksFunction = () => {
  return [
		{ rel: 'manifest', href: '/manifest.json' },
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props' },
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props/normalize.min.css' },
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props/buttons.min.css' },
    { rel: 'stylesheet', href: stylesUrl },
		...layoutLinks(),
		...moduleLinks()
  ];
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const data = merge([
		getSite(params['*']??''),
		loadTheme(request)
	])

  return data
}


function Document({ title, children }: {title?: string} & React.PropsWithChildren) {
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
					<Layout>
						{children}
					</Layout>
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

export default function Root() {
  // throw new Error("💣💥 Booooom");

  return (
    <Document>
			<Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error(caught);

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
			<div style={{ height: '70vh', display: 'flex' }}>
				<div style={{ alignSelf: 'center', margin: '0 auto', fontSize: '1rem', whiteSpace: 'pre-wrap', fontWeight: 'bold', textAlign: 'center' }}>
					<SmileySad weight="thin" size="7rem" />
					<p>
						{caught.status} {caught.statusText}
					</p>
				</div>
			</div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
		<html lang="en" style={{ height: '100%' }}>
			<head>
				<title>{error.name||''}</title>
			</head>
			<body>
				<div style={{ height: '70vh', display: 'flex' }}>
					<div style={{ alignSelf: 'center', margin: '0 auto', fontSize: '1rem', whiteSpace: 'pre-wrap', fontWeight: 'bold', textAlign: 'center' }}>
						<SmileySad weight="thin" size="7rem" />
						<pre style={{ fontSize: '1rem', whiteSpace: 'pre-wrap', fontWeight: 'bold' }}>
							{!!(error.cause || error.name)&&`${error.cause || error.name}: `}{error.message}
							{!!Object.keys(error).length && JSON.stringify(error, null, 2)}
						</pre>
					</div>
				</div>
			</body>
		</html>
  );
}

