import groq from 'groq'

import { referenceWithSlug } from "./links";
import { image } from "./image";

export const portableTextContent = groq`
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      "url": @.url,
      "isButton": @.isButton,
      "styles": @.styles{style, isLarge, isBlock},
      "page":@.page->{
        ${referenceWithSlug}
      }
    }
  },
  _type == "photo" => {
    ${image}
  }
`