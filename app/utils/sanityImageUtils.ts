import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanityClient";
import { assert } from "./utils";
import { ImageSrc } from "app/loaders/groq-fragments/objects/image";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export const imageBuilder = imageUrlBuilder(client);

const LARGEST_VIEWPORT = 1920; // Retina sizes will take care of 4k (2560px) and other huge screens

const DEFAULT_MIN_STEP = 0.1; // 10%
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1000, 1150]; // arbitrary
// Based on statcounter's most common screen sizes: https://gs.statcounter.com/screen-resolution-stats
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

export type ImagePropsParameters = {
	image?: ImageSrc,
	/**
	 * Number of the largest width it can assume in the design
	 * or "100vw" if it occupies the whole width
	 */
	maxWidth: number | '100vw',
	/**
   * The minimal width difference, in PERCENTAGE (decimal), between the image's srcSet variations.
   *
   * -> 0.10 (10%) by default.
   */
	minimumWidthStep?: number
	/**
	 * List of width sizes to use in the srcSet (NON-RETINA)
	 */
	customWidthSteps?: number[]
	customAspectRatio?: number
	/**
	 * Custom <img> element's `sizes` attribute
	 */
	sizes?: string
}

export const getImageProps = ({
  image,
  maxWidth: userMaxWidth,
  minimumWidthStep = DEFAULT_MIN_STEP,
  customWidthSteps,
	customAspectRatio,
  sizes,
}: ImagePropsParameters) => {
	if (!image?.asset?._ref) {
		return {};
  }

  const maxWidth =
		typeof userMaxWidth === "number" ? userMaxWidth : LARGEST_VIEWPORT;

  // For all image variations, we'll use an auto format and prevent scaling it over its max dimensions
  let builder = imageBuilder.image(image).auto("format");
	image.hotspot && (builder = builder.focalPoint(image.hotspot.x,image.hotspot.y).crop('focalpoint').fit('crop'))

  const imageDimensions = getImageDimensions(image);
	assert(imageDimensions, `imageDimensions was unexpectedly undefined. This will have unintended consequences`)
	const aspectRatio = customAspectRatio ?? imageDimensions.aspectRatio


	if(image.type === 'image/svg+xml') return {
		src: imageBuilder.image(image).url(),
		...imageDimensions
	}

  // Width sizes the image could assume
  const baseSizes = [
    maxWidth,
    ...(customWidthSteps ||
      (typeof userMaxWidth === "number"
        ? DEFAULT_WIDTH_STEPS
        : DEFAULT_FULL_WIDTH_STEPS)),
  ];
  const retinaSizes = Array.from(
    // De-duplicate sizes with a Set
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    .sort((a, b) => a - b) // Lowest to highest
    .filter(
      (size) =>
        // Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
        // than the image are included to ensure we always get closest to the highest
        // quality for an image. Sanity's CDN won't scale the image above its limits.
        size <= imageDimensions.width * 1.1 &&
        // Exclude those larger than maxWidth's retina (x3)
        size <= maxWidth * 3
    )

    // Exclude those with a value difference to their following size smaller than `minimumWidthStep`
    // This ensures we don't have too many srcSet variations, polluting the HTML
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      if (nextSize) {
        return nextSize / size > minimumWidthStep + 1;
      }

      return true;
    });
	
  return {
    // Let's also tell the browser what's the size of the image so it can calculate aspect ratios
    width: retinaSizes[0],
    height: Math.floor(retinaSizes[0] / aspectRatio),

    // Use the original image as the `src` for the <img>
    src: builder.width(maxWidth).height(Math.floor(maxWidth / aspectRatio)).url(),

    // Build a `{URL} {SIZE}w, ...` string for the srcset
    srcSet: retinaSizes
      .map((size) => `${builder.width(size).height(Math.floor(size / aspectRatio)).url()} ${size}w`)
      .join(", "),
    sizes:
			userMaxWidth === "100vw"
        ? "100vw"
        : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
  };
}

export const getImageDimensions = (image: SanityImageObject) => {
  if (!image?.asset?._ref) {
    return
  }

  const dimensions = image.asset._ref.split('-')[2]
  const [width, height] = dimensions.split('x').map(Number)

  if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
    return
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  }
}
