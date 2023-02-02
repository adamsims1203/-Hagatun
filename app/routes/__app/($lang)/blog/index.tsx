import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";
import { useRouteData } from "~/hooks/useRouteData";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks
}

export default function Post() {
	const data = useRouteData()

  return (
		<>
		
		</>
	);
}
