import { Link as InternalLink } from '@remix-run/react'
import React from 'react'

interface LinkProps extends React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
	to?: string
}

export const Link = ({ to, ...props }: LinkProps) =>
	/^https?:\/\//.test(to??'') ? <a {...props} href={to} />
		: typeof to === 'string' ? <InternalLink {...props} to={to} />
		: <span {...props} />
