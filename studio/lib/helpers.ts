
export const decodeAssetUrl = (id?: string) => {
	if(!id) return
  const pattern = /^(?:image|file)-([a-f\d]+)-(?:(\d+x\d+)-)?(\w+)$/
  const [, assetId, dimensions, format] = pattern.exec(id)!

  const [width, height] = dimensions
    ? dimensions.split('x').map(v => parseInt(v, 10))
    : []

  return {
    assetId,
    dimensions: { width, height },
    format
  }
}

export const replaceTemplateTags = (	
	value?: string, 
	templateTags: {
		tag: string;
		value: string | undefined;
	}[] = []
) => {
  let newString = value

  templateTags.map(v => {
    newString = newString?.replace(new RegExp(v.tag, 'g'), v.value??'')
  })

  return newString
}
