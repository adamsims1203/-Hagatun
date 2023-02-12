import React from 'react'
import { useRouteData } from '~/hooks/useRouteData'
import { Link, LinkProps } from '../core/link/link'
import { Image } from '~/components/core/image/image';
import { clsx } from '~/utils/utils';

interface LogoProps extends LinkProps {
	titleType?: 'short' | 'long' | 'none'
}

export const Logo = ({ titleType = 'long', ...props }: LogoProps) => {
	const { site } = useRouteData()

	const title = titleType === 'long' ? site.title : titleType === 'short' ? site.shortTitle : undefined
	
	return (
		<Link {...props} to={site.home.slug} className={clsx('logo', props.className)}>
			{site.seo.favicon && <Image image={site.seo.favicon} loading='eager' isInline />}
			{title && <span style={{ fontSize: 'var(--font-size-2)', letterSpacing: 'var(--font-letterspacing-3)' }}>{title}</span>}
		</Link>
	)
}
