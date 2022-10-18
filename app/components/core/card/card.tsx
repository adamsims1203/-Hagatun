import React, { Children, PropsWithChildren, useMemo } from 'react'

import { clsx } from '~/utils/utils';

import stylesUrl from './card.css'

import type { LinksFunction } from "@remix-run/node";
import { PolymorphicProps } from '~/types/types';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'horizontal' | 'vertical'
}

function Card({ orientation, children, ...props }: CardProps) {
	const {
		thumbnail,
		nonSlottedChildren
	} = useMemo(() => (Children.toArray(children)).reduce((slots, child) => {
		if(typeof child !== 'object' || !('props' in child)) return slots
		if(child.type === CardImage || child.type === CardThumbnail) slots.thumbnail ||= child
		else slots.nonSlottedChildren.push(child)

		return slots
	}, {
		thumbnail: undefined as React.ReactElement | undefined,
		nonSlottedChildren: [] as React.ReactElement[],
	}), [children])

	return (
		<div 
			{...props}
			className={clsx(
				'card',
				orientation && `card--${orientation}`,
				props.className
			)}
		>
			{thumbnail}
			<div>
				{nonSlottedChildren}
			</div>
		</div>
	)
}


interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	
}

function CardImage(props: CardImageProps) {
	return (
		<img {...props} className={clsx('card__thumbnail', props.className)} />
	)
}
Card.Image = CardImage


interface CardThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
	
}

function CardThumbnail(props: CardThumbnailProps) {
	return (
		<div {...props} className={clsx('card__thumbnail', props.className)} />
	)
}
Card.Thumbnail = CardThumbnail


interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	
}

function CardHeader(props: CardHeaderProps) {
	return (
		<div {...props} className={clsx('card__header', props.className)} />
	)
}
Card.Header = CardHeader


const DEFAULT_CARD_TITLE_TYPE = 'h2'

type CardTitleProps<E extends typeof DEFAULT_CARD_TITLE_TYPE> = PolymorphicProps<E> & {
	
}

function CardTitle<E extends typeof DEFAULT_CARD_TITLE_TYPE>({ as, ...props}: CardTitleProps<E>) {
	const Component = as ?? DEFAULT_CARD_TITLE_TYPE
	return (
		<Component {...props} className={clsx('card__title', props.className)} />
	)
}
Card.Title = CardTitle


interface CardSubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
	
}

function CardSubtitle(props: CardSubtitleProps) {
	return (
		<p {...props} className={clsx('card__subtitle', props.className)} />
	)
}
Card.Subtitle = CardSubtitle


interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
	
}

function CardBody(props: CardBodyProps) {
	return (
		<div {...props} className={clsx('card__body', props.className)} />
	)
}
Card.Body = CardBody


interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'horizontal' | 'vertical'
	placement?: 'start' | 'end'
}

function CardActions({ orientation, placement, ...props }: CardActionsProps) {
	return (
		<div 
			{...props} 
			className={clsx(
				'card__actions', 
				orientation && `card__actions--${orientation}`, 
				placement && `card__actions--${placement}`, 
				props.className,
			)} 
		/>
	)
}
Card.Actions = CardActions

export default Card
