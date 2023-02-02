import { getImageDimensions, getImageProps, ImagePropsParameters } from '~/utils/sanityImageUtils'
import { urlBuilder } from '~/utils/urlBuilder'
import { clsx } from '~/utils/utils'

export interface SanityImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, Pick<ImagePropsParameters, 'image'> {
	options?: Partial<ImagePropsParameters>
	lqipEnabled?: boolean
	isInline?: boolean
}

export const Image = ({ image, isInline, lqipEnabled = true, options, ...props }: SanityImageProps) => {
	if(!image) return null;
  const {width, height} = getImageDimensions(image)??{}
	props.loading ??= 'lazy'
	image.type === 'image/svg+xml' && (lqipEnabled = false)

	const style = {
		// Display alongside text if image appears inside a block text span
		display: isInline ? 'inline-block' : 'block',

		// Avoid jumping around with aspect-ratio CSS property
		aspectRatio: width && height && width / height,
		...props.style??null
	}
	
  return (
    <>
			<img
				{...props}
				className={clsx(
					image.type === 'image/svg+xml' ? 'fit svg' : 'cover',
					props.className
				)}
				src={urlBuilder
					.image(image)
					.width(isInline ? 100 : 800)
					.fit('max')
					.auto('format')
					.url()}
				alt={image.alt}
				style={style}
				{...{
					fetchpriority: props.loading === 'eager' ? 'high' : undefined
				}}
			/>
			{lqipEnabled && <img
				style={{ ...style, position: 'absolute', zIndex: 0, top: 0, left: 0 }}
				aria-hidden
				src={image.lqip}
			/>}
		</>
  )
}
