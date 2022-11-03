import stylesUrl from "./text-image.css";

import type { LinksFunction } from "@remix-run/node";
import type { ModuleProps } from '..';
import { THEME } from "~/utils/theme-provider";
import { clsx } from "~/utils/utils";

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

function textImage({ data }: ModuleProps<'text-image'>) {
	
	return (
		<section
			className={clsx(
				'text-image',
				`text-image--placement-${data.contentPlacement}`
			)}
			style={{ '--_image': `url(${data.image.src})` } as React.CSSProperties}
			color-scheme={data.theme}
		>
			<div>
				<div className='text-image__content'>
					<h1>{data.title}</h1>
					<p dangerouslySetInnerHTML={{ __html: data.text }} />
				</div>
			</div>
		</section>
	)
}

export default textImage