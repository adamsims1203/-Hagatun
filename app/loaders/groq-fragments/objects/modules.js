import groq from 'groq'

import { image } from './image'
import { portableTextContent } from './portableTextContent'

export const modules = groq`
  _type == 'hero' => {
    _type,
    _key,
    content[]{
      ${portableTextContent}
    },
    bgType,
    photos{
      ...,
      mobilePhoto{
        ${image}
      },
      desktopPhoto{
        ${image}
      }
    },
    video{
      id,
      title
    }
  },
  _type == 'marquee' => {
    _type,
    _key,
    items[]{
      _type == 'simple' => {
        _type,
        text
      },
      _type == 'photo' => {
        _type,
        "photo": {
          ${image}
        }
      }
    },
    speed,
    reverse,
    pauseable
  },
  _type == 'dividerPhoto' => {
    _type,
    _key,
    photo{
      ${image}
    }
  },
  _type == 'productHero' => {
    _type,
    _key,
  }
`