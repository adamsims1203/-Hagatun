import { defineField } from "sanity"

export const customImage = ({ hasDisplayOptions = false, ...props }: Partial<Parameters<typeof defineField>[0]> & { hasDisplayOptions?: boolean } = {}) => {
  const crops = [
    { title: 'Original', value: 0 },
    { title: '1 : 1 (square)', value: 1 },
    { title: '5 : 7', value: 0.7142857143 },
    { title: '4 : 6', value: 0.6666666667 },
    { title: '16 : 9', value: 1.7777777778 }
  ]

  return defineField({
    type: 'image',
    name: 'image',
    title: 'Image',
    options: {
      hotspot: true
    },
    fields: [
			defineField({
				title: 'Display Size (aspect ratio)',
				name: 'customRatio',
				type: 'number',
				options: {
					list: crops,
				},
				/* validation: Rule =>
					Rule.custom((field, context: any) =>
						'asset' in context.parent && field === undefined
							? 'Required!'
							: true
					), */
				hidden: true
			}),
      {
        title: 'Alternative text',
        name: 'alt',
        type: 'string',
        description: 'Important for SEO and accessiblity.'
      }
    ],
    preview: {
      select: {
        asset: 'asset',
        alt: 'asset.alt',
        customAlt: 'alt',
        customRatio: 'customRatio'
      },
      prepare: ({ alt, customAlt, customRatio, asset }) => ({
				title: customAlt ?? alt ?? '(alt text missing)',
				subtitle: crops.find(crop => crop.value === customRatio)?.title,
				media: asset
			})
    },
    ...props as object
  })
}
