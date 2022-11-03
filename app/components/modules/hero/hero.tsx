import { MapPin, Phone, EnvelopeSimple } from 'phosphor-react'

import { THEME } from '~/utils/theme-provider';

import stylesUrl from "./hero.css";

import type { LinksFunction } from "@remix-run/node";
import type { ModuleProps } from '..';
import { useRouteData } from '~/hooks/useRouteData';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

function Hero({ data }: ModuleProps<'hero'>) {
	const { page } = useRouteData()

	return (
		<section className="hero" color-scheme={THEME.light} style={{ '--hero-image-url': `url(${data.photos.desktopPhoto.src})` } as React.CSSProperties}>
			<div>
				<div className="hero-content">
					<h1 className="hero-title">{data.title}</h1>
					<p className="hero-subtitle">{data.subtitle}</p>
					<div className="hero-contact-list">
						<h2>Kontakta oss</h2>
						<div>
							<div>
								<h3>Plats</h3>
								<div>
									{page?.company.offices.map(v => <p key={v._key}>{v.address} <MapPin /></p>)}
								</div>
							</div>
							<hr/>
							<div>
								<h3>Telefon</h3>
								<div>
									{page?.company.offices.map(v => <p key={v._key}><a href={`tel:${v.phoneNumber}`}>{v.phoneNumber}</a> <Phone mirrored /></p>)}
								</div>
							</div>
							<hr/>
							<button className="primary"><EnvelopeSimple />info@hagatun.se</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero