import { getImageDimensions, getImageProps, ImagePropsParameters } from '~/utils/sanityImageUtils'
import { urlBuilder } from '~/utils/urlBuilder'
import { clsx } from '~/utils/utils'

export interface SanityImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, Pick<ImagePropsParameters, 'image'> {
	lqipEnabled?: boolean
	isInline?: boolean
	isFullscreen?: boolean
}

export const Image = ({ image, isInline, isFullscreen, lqipEnabled = true, ...props }: SanityImageProps) => {
	if(!image) return null;
  let { width, aspectRatio } = getImageDimensions(image)??{}

	if(isInline) width = 100
	if(isFullscreen) width = 1440
	width ||= 800

	props.loading ??= 'lazy'
	image.type === 'image/svg+xml' && (lqipEnabled = false)

	const sharedProps = {
		style: {
			// Display alongside text if image appears inside a block text span
			display: isInline ? 'inline-block' : 'block',
	
			// Avoid jumping around with aspect-ratio CSS property
			aspectRatio: !isFullscreen ? aspectRatio : undefined
		},
		...width && aspectRatio ? {
			width,
			height: width / aspectRatio
		} : null
	} as const
	
  return (
    <>
			<img
				{...props}
				{...sharedProps}
				style={{ ...sharedProps.style, ...props.style??null }}
				className={clsx(
					image.type === 'image/svg+xml' ? 'fit svg' : 'cover',
					props.className
				)}
				src={urlBuilder
					.image(image)
					.width(width)
					.fit('max')
					.auto('format')
					.url()}
				alt={image.alt}
				{...{
					fetchpriority: props.loading === 'eager' ? 'high' : undefined
				}}
			/>
			{lqipEnabled && <img
				{...sharedProps}
				style={{ ...sharedProps.style, position: 'absolute', zIndex: 0, top: 0, left: 0 }}
				aria-hidden
				src={image.lqip}
			/>}
		</>
  )
}
