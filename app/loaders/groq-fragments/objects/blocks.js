import groq from 'groq'

import { portableTextContent } from "./portableTextContent";

export const blocks = groq`
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      "id": _key,
      title,
      content[]{
        ${portableTextContent}
      }
    }
  }
`