import { StructureBuilder } from 'sanity/desk'
import { BlogPostIcon } from '../../schemas/documents/blog-post';

export const postsMenu = (S: StructureBuilder) =>
	[
		S.listItem()
			.title('Blog posts')
			.child(
				S.documentTypeList('blogPost').title('Blog posts')
			)
			.icon(BlogPostIcon)
	]
