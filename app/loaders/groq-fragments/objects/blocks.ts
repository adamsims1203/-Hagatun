import groq from 'groq'

import { portableTextContent } from "./portableTextContent";

export const blocks = groq`
  _type == 'accordions' => {
    _type,
    _key,
    items[]{
      _key,
      title,
      content[]{
        ${portableTextContent}
      }
    }
  }
`
