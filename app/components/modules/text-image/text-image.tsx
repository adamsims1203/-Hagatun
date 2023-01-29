import { PortableText } from '@portabletext/react';

import { clsx } from 'app/utils/utils';
import { Image } from '~/components/core/Image/Image';

import stylesUrl from './text-image.css'

import type { LinksFunction } from '@remix-run/node';
import type { ModuleProps } from '..';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

const TextImage = ({ data }: ModuleProps<'text-image'>) => {
	
	return (
		<section className={clsx(
			'text-image',
			`text-image--alignment-${data.alignment}`
		)}>
			<div className='text-image__text'>
				<PortableText value={data.body} />
			</div>
			<div className='text-image__image'>
				<Image
					image={data.photo}
					maxWidth={650}
				/>
			</div>
		</section>
	)
}

export default TextImage