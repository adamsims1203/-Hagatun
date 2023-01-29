import createSanityClient from "@sanity/client";
import { projectDetails } from "sanity/projectDetails";

import { IS_PROD } from "~/utils/constants";

const details = projectDetails()

const options = {
	...details,
	useCdn: IS_PROD,
}

export const client = createSanityClient(options)
