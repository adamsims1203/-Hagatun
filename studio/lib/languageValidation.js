import i18nconfig from 'config:@sanity/document-internationalization';
import sanityClient from 'part:@sanity/base/client'

export const validateLanguage = Rule => [
	Rule.custom(async ({ page }, { document }) => {
		if(!page) return true
		const p = (await sanityClient.fetch(`*[_id == $id]`, {
			id: page._ref
		})).find(item => item.__i18n_lang !== document.__i18n_lang)
		return !p || `
			Wrong language: 
				Page "${p.title}" is in ${i18nconfig.languages.find(l => l.id === p.__i18n_lang).title.toLowerCase()} 
				but needs to be in ${i18nconfig.languages.find(l => l.id === document.__i18n_lang).title.toLowerCase()} 
		`
	})
]