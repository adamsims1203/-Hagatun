import { SlugIsUniqueValidator } from 'sanity'

// Note: this assumes that every document that has a slug field
// have it on the `slug` field at the root
export const isUniqueAcrossAllDocuments: SlugIsUniqueValidator = (slug, context) => {
  const id = context.document?._id.replace(/^drafts\./, '')??''
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug
  }

  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`

  return context.getClient({apiVersion: '2021-06-07'}).fetch(query, params)
}