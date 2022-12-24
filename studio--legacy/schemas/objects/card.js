import i18nconfig from 'config:@sanity/document-internationalization';

export default {
	name: 'card',
	title: 'Card',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string'
		},
		{
			name: 'thumbnail',
			title: 'Thumbnail',
			type: 'image'
		},
		{
			name: 'text',
			title: 'Text',
			type: 'text'
		},
		{
			name: 'link',
			title: 'Link',
			type: 'reference',
      to: [{ type: 'page' }],
			options: {
				filter: '__i18n_lang == $lang',
				filterParams: {lang: i18nconfig.base}
			},
		}
	]
}