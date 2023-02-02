import { Module } from "~/components/modules";
import { getPage } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";
import { useRouteData } from "~/hooks/useRouteData";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks
}

export const loader = async ({ params }: LoaderArgs) => {
	const data = await getPage(params)

  if (!data.page) 
    throw new Response("Not Found", { status: 404 })

  return data
}

export default function Page() {
	const data = useRouteData()
	
  return (
		<>
			{data?.page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
		</>
	);
}
