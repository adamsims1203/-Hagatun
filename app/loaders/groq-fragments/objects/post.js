import groq from "groq";

import { image } from "./image";
import { referenceBlogPostWithSlug } from "./links";

export const post = groq`
	"_key": _rev,
	_type,
	"href": {
		${referenceBlogPostWithSlug}
	},
	title,
	publishedAt,
	body,
	excerpt,
	"authorName": author->name,
	"image": mainImage {
		${image}
	},
`