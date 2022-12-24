import { ListItemBuilder, StructureBuilder } from 'sanity/desk'
import { MenuIcon } from '../../schemas/documents/menu'

export const menusMenu = (S: StructureBuilder): ListItemBuilder => 
	S.listItem()
		.title('Menus')
		.child(
			S.documentTypeList('menu').title('Menus')
		)
		.icon(MenuIcon)
