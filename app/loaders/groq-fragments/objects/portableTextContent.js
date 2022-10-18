import groq from 'groq'

import { pageReference } from "./links";
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
        ${pageReference}
      }
    }
  },
  _type == "photo" => {
    ${image}
  }
`