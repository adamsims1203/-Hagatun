import { MapPin, Phone, EnvelopeSimple } from 'phosphor-react'

import { THEME } from '~/utils/theme-provider';
import { useRouteData } from '~/hooks/useRouteData';

import stylesUrl from "./start-page-hero.css";

import type { LinksFunction } from "@remix-run/node";
import type { ModuleProps } from '..';
import { Image } from '~/components/core/image/image';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

function StartPageHero({ data }: ModuleProps<'start-page-hero'>) {
	const { site } = useRouteData()

	return (
		<section className="start-page-hero" color-scheme={THEME.light}>
			<div>
				<Image image={data.image} loading='eager' isFullscreen />
				<div className="start-page-hero-content">
					<h1 className="start-page-hero-title">{data.title}</h1>
					<p className="start-page-hero-subtitle">{data.subtitle}</p>
					<div className="start-page-hero-contact-list">
						<h2>Kontakta oss</h2>
						<div>
							<div>
								<h3>Plats</h3>
								<div>
									{site?.company.offices?.map(v => <p key={v._key}>{v.address} <MapPin /></p>)}
								</div>
							</div>
							<hr/>
							<div>
								<h3>Telefon</h3>
								<div>
									{site?.company.offices?.map(v => <p key={v._key}><a href={`tel:${v.phoneNumber}`}>{v.phoneNumber}</a> <Phone mirrored /></p>)}
								</div>
							</div>
							<hr/>
							<button className="primary"><EnvelopeSimple />{site?.company.email}</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default StartPageHero