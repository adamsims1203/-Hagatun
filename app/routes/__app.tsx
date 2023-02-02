import { Outlet, useCatch } from "@remix-run/react";
import { LoaderArgs, LinksFunction } from "@remix-run/node";
import { SmileySad } from "phosphor-react";

import Layout, { links as layoutLinks } from "~/components/layout/layout";
import { links as moduleLinks } from "~/components/modules";
import { getSite } from "~/loaders";
import { loadTheme } from "~/utils/theme.server";
import { merge } from "~/utils/utils";

import stylesUrl from "~/styles/global.css";
import { useRouteData } from "~/hooks/useRouteData";
import { Link } from "~/components/core/link/link";

export const links: LinksFunction = () => {
  return [
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
		getSite(params),
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
	const { site } = useRouteData()
  const caught = useCatch();
  console.error(caught);

  return (
		<Layout>
			<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ whiteSpace: 'pre-wrap', fontWeight: 'bold', textAlign: 'center', maxWidth: 'var(--size-content-2)' }}>
					<h1 style={{ maxInlineSize: 'unset', fontSize: '10rem' }}>404</h1>
					<h2 style={{ maxInlineSize: 'unset', marginBlockEnd: '2ch' }}>Page Not Found</h2>
					<p>
						The Page you are looking for doesn't exist or an other error occured. Go to <Link to={site.home.slug}>Home Page</Link>.
					</p>
				</div>
			</div>
    </Layout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error('ErrorBoundary', error);

  return (
		<html lang="en" style={{ height: '100%' }}>
			<head>
				<title>{error.name||''}</title>
			</head>
			<body>
				<div style={{ height: '100vh', display: 'flex' }}>
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

