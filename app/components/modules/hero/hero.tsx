import { clsx } from "~/utils/utils";
import { Image } from '~/components/core/image/image'

import stylesUrl from "./hero.css";

import type { LinksFunction } from "@remix-run/node";
import type { ModuleProps } from '..';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

function Hero({ data }: ModuleProps<'hero'>) {
	
	return (
		<section
			className={clsx(
				'hero',
				`hero--placement-${data.contentPlacement}`
			)}
			color-scheme={data.theme}
		>
			<Image image={data.image} />
			<div>
				<div className='hero__content'>
					<h2>{data.title}</h2>
					<p>{data.text}</p>
				</div>
			</div>
		</section>
	)
}

export default Hero