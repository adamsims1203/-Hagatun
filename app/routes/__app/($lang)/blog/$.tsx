import { useLoaderData } from "@remix-run/react";
import { LoaderArgs, MetaFunction } from "@remix-run/node";

import { merge } from "~/utils/utils";
import { getBlogPost, getSite } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";
import { useRouteData } from "~/hooks/useRouteData";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks
}

export const loader = async ({ params }: LoaderArgs) => {
	const data = 	await merge([
		getSite(params),
		getBlogPost(params)
	])

  if (data.notFound)
    throw new Response("Not Found", { status: 404 })

  return data
}

export default function Post() {
	const data = useRouteData()

  return (
		<>
		
		</>
	);
}
