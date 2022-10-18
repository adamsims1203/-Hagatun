import { Link as InternalLink } from '@remix-run/react'
import React from 'react'

interface LinkProps extends React.PropsWithChildren {
	to?: string
}

export const Link = ({ to, ...props }: LinkProps) =>
	/^https?:\/\//.test(to??'') ? <a href={to} {...props} />
		: typeof to === 'string' ? <InternalLink to={to} {...props} />
		: <span {...props} />
