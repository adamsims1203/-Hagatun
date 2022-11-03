import React from "react";
import { SquareHalf } from "phosphor-react";

export default {
	name: 'hero',
	title: 'Hero',
	type: 'object',
  icon: SquareHalf,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'text',
			title: 'Text',
			type: 'text'
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image'
		},
		{
			name: 'theme',
			title: 'Theme',
			type: 'string',
			options: {
				list: [
					{title: 'Light', value: 'light'},
					{title: 'Dark', value: 'dark'}
				],
				layout: 'radio'
			}
		},
		{
			name: 'contentPlacement',
			title: 'Content placement',
			type: 'string',
			options: {
				list: [
					{title: 'Left', value: 'left'},
					{title: 'Right', value: 'right'}
				],
				layout: 'radio'
			}
		}
	]
}