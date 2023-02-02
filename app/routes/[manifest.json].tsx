import { json, LoaderFunction } from '@remix-run/node';

import { urlBuilder } from '~/utils/urlBuilder';
import { getThemeSession } from '~/utils/theme.server'
import { getSite } from '~/loaders';
import { assert } from '~/utils/utils';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';


const createImageGenerator = (src: SanityImageSource) => ({ size , ...rest }: { size: number }) => ({
	src: urlBuilder.image(src).size(size, size).url(),
	sizes: `${size}x${size}`,
	type: 'image/png',
	purpose: 'maskable',
	...rest
})

export const loader: LoaderFunction = async ({ request, params }) => {
	const isDarkMode = (await getThemeSession(request)).getTheme() === 'dark'
	const { site } = await getSite(params)
	assert(site)

	const getImage = site.seo.touchIcon && createImageGenerator(site.seo.touchIcon)
	
	return json(
		{
			short_name: site.shortTitle,
			name: site.title,
			start_url: '/',
			display: 'standalone',
			background_color: isDarkMode ? '#d3d7dd' : '#f8f9fa',
			theme_color: isDarkMode ? '#C3A94D' : '#ac9339',
			shortcuts: getImage ? [
				{ 
					name: 'Homepage',
					url: '/',
					icons: [
						{ size: 96, density: 2.0, purpose: 'any monochrome' }
					].map(getImage),
				},
			] : undefined,
			// https://maskable.app/editor
			icons: getImage ? [
				{ size: 36, density: 0.75 },
				{ size: 48, density: 1.0 },
				{ size: 72, density: 1.5 },
				{ size: 96, density: 2.0 },
				{ size: 144, density: 3.0 },
				{ size: 192, density: 4.0 },
			].map(getImage) : undefined,
		},
		{
			headers: {
				'Cache-Control': 'public, max-age=600',
				'Content-Type': 'application/manifest+json',
			},
		},
	);
};