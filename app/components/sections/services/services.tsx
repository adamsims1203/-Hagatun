import Card, { links as cardLinks } from "~/components/core/card/card";

import stylesUrl from "./services.css";

import annualReportPath from '~/assets/illustrations/services/annual-report.png'
import exchangeRatePath from '~/assets/illustrations/services/exchange-rate.png'
import allocationPath from '~/assets/illustrations/services/allocation.png'
import personalPath from '~/assets/illustrations/services/personal.png'
import benchmarkPath from '~/assets/illustrations/services/benchmark.png'
import contactUsPath from '~/assets/illustrations/services/contact-us.png'

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl },
		...cardLinks()
	];
};

const actions = [
	{
		src: annualReportPath,
		title: 'Bokföring',
		text: 'Vi hjälper ditt företag med bokföringen. Enkelt och smidigt.',
		href: ''
	},
	{
		src: exchangeRatePath,
		title: 'Lön',
		text: 'Det är mycket att hålla reda på när det gäller löner. Vi hjälper er med hela processen.',
		href: ''
	},
	{
		src: allocationPath,
		title: 'Bokslut, Deklaration & Årsredovisning',
		text: 'Låt oss hjälpa er att göra det enklare.',
		href: ''
	},
	{
		src: personalPath,
		title: 'Uthyrning av personal',
		text: 'Behöver ni förstärka er ekonomiavdelning med personal? Låt oss hjälpa er',
		href: ''
	},
	{
		src: benchmarkPath,
		title: 'Rådgivning',
		text: 'Oavsett om ert företag har funnits länge eller om ni funderar på att starta ett nytt företag, så kan vi hjälpa er att ta nästa steg.',
		href: ''
	},
	{
		src: contactUsPath,
		title: 'Kontakta oss',
		text: 'Låt oss hjälpa er att göra det enklare.',
		href: ''
	},
]

function Services() {
	return (
		<section className="services">
			<h2>Tjänster</h2>
			<div>
				{actions.map(action => (
					<Card orientation="vertical">
						<Card.Image src="https://store-images.s-microsoft.com/image/apps.29972.14474337564596307.6c783b22-9460-4205-938c-2969961ed85c.aa21aff2-b2b2-411b-88bb-158187c6e238?mode=scale&q=90&h=1080&w=1920" />
						<Card.Header>
							<Card.Title>Coffee with friends</Card.Title>
							<Card.Subtitle>
								4/5 (681)
							</Card.Subtitle>
						</Card.Header>
						<Card.Body>
							<p>
								The right place to be if you're in love with high quality
								espresso or tea. We offer wide range to top coffee brands as
								Davidoff Cafe, Lavazza, Tchibo, Illy.
							</p>
						</Card.Body>
						<Card.Actions>
							<button className="button-primary">
								Review
							</button>
						</Card.Actions>
					</Card>
				))}
				
			</div>
		</section>
	)
}

export default Services