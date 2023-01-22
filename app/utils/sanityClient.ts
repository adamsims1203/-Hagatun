import createSanityClient from "@sanity/client";

import { IS_PROD } from "~/utils/constants";

const options = {
	dataset: "development",
	projectId: 's50l6en8',
	token: process.env.SANITY_TOKEN, 
	useCdn: IS_PROD,
	apiVersion: '2022-09-26',
}

export const client = createSanityClient(options)
