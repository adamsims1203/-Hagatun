import { useCatch, useLoaderData } from "@remix-run/react";
import { LoaderArgs, MetaFunction } from "@remix-run/node";

import { Module, hydrate as moduleHydrate } from "~/components/modules";
import { merge } from "~/utils/utils";
import { getPage, getSite } from "~/loaders";
import { metadata } from "~/loaders/metadata";
import { dynamicLinks } from "~/loaders/dynamicLinks";

export const meta: MetaFunction = ({ data }) => {
	return {
		...metadata(data)
	}
}

export const handle = { 
	dynamicLinks,
	hydrate: true && moduleHydrate,
}

export const loader = async ({ params }: LoaderArgs) => {
	const data = await merge([
		getPage(params['*']),
		getSite(params['*'])
	])

  if (!data.page) {
    // When there's an expected error (like no found user) throw a response.
    throw new Response("Not Found", { status: 404 })
  }

  return data
}

export default function Page() {
	const data = useLoaderData<typeof loader>()
	console.log(data)
  return (
		<>
			{data?.page?.modules?.map((module, i) => (
        <Module key={i} index={i} data={module} />
      ))}
		</>
	);
}
