import stylesUrl from "./hero.css";
import { clsx } from "~/utils/utils";

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
			style={{ '--_image': `url(${data.image.src})` } as React.CSSProperties}
			color-scheme={data.theme}
		>
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