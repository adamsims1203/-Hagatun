import { defineType } from "sanity";

export const office = defineType({
	type: 'object',
	name: 'office',
	title: 'Office',
	fields: [
		{
			type: 'string',
			name: 'name',
			title: 'Name',
		},
		{
			type: 'string',
			name: 'address',
			title: 'Address',
		},
		{
			type: 'string',
			name: 'phoneNumber',
			title: 'Phone number',
		},
	]
})