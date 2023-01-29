import { getImageProps, ImagePropsParameters } from '~/utils/sanityImageUtils'

export interface SanityImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, Pick<ImagePropsParameters, 'image'> {
	maxWidth?: ImagePropsParameters['maxWidth']
	options?: Partial<ImagePropsParameters>
	lqipEnabled?: boolean
}

export const Image = ({ image, maxWidth, lqipEnabled = true, options, ...props }: SanityImageProps) => {
	if(!image) return null;
	maxWidth ??= 600
	props.loading ??= 'lazy'
	image.type === 'image/svg+xml' && (lqipEnabled = false)
  return (
    <>
			<img
				alt={image.alt}
				{...getImageProps({image, maxWidth, ...options??{}})}
				{...{
					fetchpriority: props.loading === 'eager' ? 'high' : undefined
				}}
				className={image.type === 'image/svg+xml' ? 'fit svg' : 'cover'}
				{...props}
			/>
			{lqipEnabled && <img
				style={{ position: 'absolute', zIndex: 0, top: 0, left: 0 }}
				aria-hidden
				src={image.lqip}
			/>}
		</>
  )
}
