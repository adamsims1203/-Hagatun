export const slugify = input =>
	input
		.toLowerCase()
		.replaceAll('ö', 'o')
		.replaceAll('ä', 'a')
		.replaceAll('å', 'a')
		//Remove special characters
		.replace(/[&\\#,+()$~%.'":;*?<>{}]/g, "")
		.replace(/\s\s+/g, ' ')
		.replace(/\s+/g, "-")
