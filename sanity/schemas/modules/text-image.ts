import { Textbox } from "phosphor-react";
import { defineType } from "sanity";
import { customImage } from "../../lib/custom-image";

export const textImage = defineType({
	name: 'text-image',
  title: 'Text Image',
  type: 'object',
  icon: Textbox,
  fields: [
		{
			type: 'blockContent',
			name: 'body',
			title: 'Body'
		},
    customImage({
			name: 'photo',
			title: 'Background Photo',
    }),
		{
			name: 'alignment',
			title: 'Alignment (Text)',
			description: 'Where is the text relative to the image',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio'
			},
			initialValue: 'left'
		},
  ],
  preview: {
    select: {
      body: 'body',
			alignment: 'alignment',
      media: 'photo',
    },
    prepare: ({ body, alignment, media }) => ({
			title: body?.[0]?.children?.[0]?.text ?? 'Text Image', 
			subtitle: `Text to the ${alignment}`,
			media
		})
  }
})