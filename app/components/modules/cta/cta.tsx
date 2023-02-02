import React from 'react'

import Card, { links as cardLinks } from '~/components/core/card/card'
import { Link } from '~/components/core/link/link'
import { Image } from '~/components/core/image/image'

import stylesUrl from "./cta.css";

import type { LinksFunction } from '@remix-run/node';
import type { ModuleProps } from '..'

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl },
		...cardLinks()
	];
};

const CTA = ({ data }: ModuleProps<'cta'>) => {
	
	return (
		<section className='cta'>
			<h2>{data.title}</h2>
			<div>
				{data.cards.map(card => {
					const item = (
						<Card orientation='vertical'>
							<Card.Thumbnail>
								<Image image={card.thumbnail} />
							</Card.Thumbnail>
							<Card.Body>
								<h3>{card.title}</h3>
								<p>{card.text}</p>
							</Card.Body>
						</Card>
					);
					return (
						<div key={card._key}>
							{card.href 
								? <Link to={card.href.slug}>{item}</Link> 
								: item
							}
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default CTA