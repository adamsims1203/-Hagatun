export const Icon = (props) => {
	const { Icon, color } = getIcon(icon)
	return <Icon size={props.dimensions.width} weight="fill" color={color} />
}
