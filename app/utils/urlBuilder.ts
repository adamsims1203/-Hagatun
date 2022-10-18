import builder from '@sanity/image-url'
import { client } from './sanityClient'

export const urlBuilder = builder(client)
