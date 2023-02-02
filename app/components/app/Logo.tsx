import React from 'react'
import { useRouteData } from '~/hooks/useRouteData'
import { Link, LinkProps } from '../core/link/link'
import { Image } from '~/components/core/image/image';
import { clsx } from '~/utils/utils';

export const Logo = (props: LinkProps) => {
	const { site } = useRouteData()
	
	return (
		<Link {...props} to={site.home.slug} className={clsx('logo', props.className)}>
			{site.seo.favicon && <Image image={site.seo.favicon} loading='eager' isInline />}<span>{site.title}</span>
		</Link>
	)
}
