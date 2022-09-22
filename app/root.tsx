import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Layout, { links as layoutLinks } from "./components/layout/layout";
import { useShouldHydrate } from "./hooks/useShouldHydrate";

import stylesUrl from "~/styles/global.css"; 

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: stylesUrl },
		...layoutLinks()
  ];
};

export default function App() {
  const shouldHydrate = useShouldHydrate();
	
  return (
    <html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Layout>
					<Outlet />
				</Layout>
				<ScrollRestoration />
        {/* Render Scripts if shouldHydrate is true */}
				{shouldHydrate && <Scripts />}
        {process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
  );
}
