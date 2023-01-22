import { Outlet, useCatch } from "@remix-run/react";
import { LoaderArgs, LinksFunction } from "@remix-run/node";
import { SmileySad } from "phosphor-react";

import Layout, { links as layoutLinks } from "~/components/layout/layout";
import { links as moduleLinks } from "~/components/modules";
import { getSite } from "~/loaders";
import { loadTheme } from "~/utils/theme.server";
import { merge } from "~/utils/utils";

export const links: LinksFunction = () => {
  return [
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props' },
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props/normalize.min.css' },
		{ rel: 'stylesheet', href: 'https://unpkg.com/open-props/buttons.min.css' },
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

export default function App() {
  // throw new Error("💣💥 Booooom");

  return (
    <Layout>
			<Outlet />
		</Layout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error(caught);

  return (
		<Layout>
			<div style={{ height: '70vh', display: 'flex' }}>
				<div style={{ alignSelf: 'center', margin: '0 auto', fontSize: '1rem', whiteSpace: 'pre-wrap', fontWeight: 'bold', textAlign: 'center' }}>
					<SmileySad weight="thin" size="7rem" />
					<p>
						{caught.status} {caught.statusText}
					</p>
				</div>
			</div>
    </Layout>
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

