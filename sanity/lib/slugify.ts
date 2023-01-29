import { SlugifierFn } from "sanity";

export const slugify: SlugifierFn = input =>
	input
		.toLowerCase()
		.trim()
		.replaceAll('ö', 'o')
		.replaceAll('ä', 'a')
		.replaceAll('å', 'a')
		//Remove special characters
		.replace(/[&\\#,+()$~%.'":;*?<>{}]/g, "")
		.replace(/\s\s+/g, ' ')
		.replace(/\s+/g, "-")
