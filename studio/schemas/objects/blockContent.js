import i18nconfig from 'config:@sanity/document-internationalization';

 export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
					{ title: 'Strong', value: 'strong' }, 
					{ title: 'Emphasis', value: 'em' }
				],
        annotations: [
					{
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Link Type',
                name: 'linkType',
                type: 'string',
                options: {
                  list: [
                    { title: 'Internal Page', value: 'internal' },
                    { title: 'External URL', value: 'external' },
                    { title: 'Social Link', value: 'social' },
                  ],
                  layout: 'radio',
                  direction: 'horizontal'
                },
                initialValue: 'internal',
                validation: Rule => Rule.required()
              },
              {
                title: 'Internal Page',
                name: 'page',
                type: 'reference',
                to: [{ type: 'page' }],
								options: {
									filter: '__i18n_lang == $lang',
									filterParams: {lang: i18nconfig.base}
								},
                hidden: ({ parent }) => parent.linkType !== 'internal'
              },
              {
                title: 'External URL',
                name: 'url',
                type: 'url',
                validation: Rule =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  }),
                hidden: ({ parent }) => parent.linkType !== 'external'
              }
            ]
          },
        ]
      }
    },
    {
      type: 'image',
      options: {hotspot: true}
    }
  ]
}