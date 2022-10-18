import { MapPin, Phone, EnvelopeSimple } from 'phosphor-react'

import stylesUrl from "./hero.css";

import image from '~/assets/images/hero-background.jpeg'

import type { LinksFunction } from "@remix-run/node";
import { ModuleProps } from '..';
import { THEME } from '~/utils/theme-provider';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl },
		{
			rel: "preload",
			href: image,
			as: "image",
			type: "image/jpeg",
		},
	];
};

const INFO = {
	location: [
		'Östertullsgatan 9, Laholm',
		'Kaptensgatan 8, 302 45 Halmstad',
	],
	phone: [
		'+4670 - 753 79 53',
		'035 - 12 30 95'
	]
}



function Hero({ data }: ModuleProps) {
	
	return (
		<section className="hero" color-scheme={THEME.light}>
			<div className="hero-content">
				<h1 className="hero-title">Lorem ipsum dolor sit amet.</h1>
				<p className="hero-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					
				<div className="hero-contact-list">
					<h2>Kontakta oss</h2>
					<div>
						<div>
							<h3>Plats</h3>
							<div>
								{INFO.location.map(v => <p key={v}>{v} <MapPin /></p>)}
							</div>
						</div>
						<hr/>
						<div>
							<h3>Telefon</h3>
							<div>
								{INFO.phone.map(v => <p key={v}><a href={`tel:${v}`}>{v}</a> <Phone mirrored /></p>)}
							</div>
						</div>
						<hr/>
						<button className="primary"><EnvelopeSimple />info@hagatun.se</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero