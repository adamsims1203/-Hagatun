import React from 'react'

export const getModuleName = type => {
  switch (type) {
    case 'hero':
      return 'Hero'
    case 'marquee':
      return 'Marquee'
    case 'dividerPhoto':
      return 'Divider Photo'
    default:
      return null
  }
}

// replace template tags with values
export function replaceTemplateTags(string, templateTags = []) {
  let newString = string

  templateTags.map(v => {
    newString = newString?.replace(new RegExp(v.tag, 'g'), v.value)
  })

  return newString
}

export const decodeAssetUrl = id => {
  const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/
  const [, assetId, dimensions, format] = pattern.exec(id)

  const [width, height] = dimensions
    ? dimensions.split('x').map(v => parseInt(v, 10))
    : []

  return {
    assetId,
    dimensions: { width, height },
    format
  }
}
