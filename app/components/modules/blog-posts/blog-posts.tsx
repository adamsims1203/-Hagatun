import React from 'react'

import { Link } from '~/components/core/link/link';
import { ModuleProps } from '..';

import stylesUrl from './blog-posts.css'

import type { LinksFunction } from '@remix-run/node';
import Card from '~/components/core/card/card';
import { dateFormat } from '~/utils/utils';

export const links: LinksFunction = () => {
  return [
		{ rel: "stylesheet", href: stylesUrl }
	];
};

const BlogPosts = ({ data }: ModuleProps<'blog-posts'>) => {
	console.log(data)
	return (
		<section className='blog-posts'>
			<div className='blog-posts__header'>
				<h2>Nyheter</h2>
				<Link to={'/blog'}>Se alla</Link>
			</div>
			<div className='blog-posts__list'>
				{data.posts.map(post =>
					<Link key={post.href.slug} to={post.href.slug}>
						<Card as='article' responsive>
							{post.image && 
								<Card.Thumbnail>
									<img src={post.image.src} alt="" />
								</Card.Thumbnail>
							}
							<Card.Header>
								<Card.Title>
									{post.title}
								</Card.Title>
								<Card.Subtitle>
									<time>{post.publishedAt}</time>
								</Card.Subtitle>
							</Card.Header>
							{post.excerpt && 
								<Card.Body>
									<p>{post.excerpt}</p>
								</Card.Body>
							}
						</Card>
					</Link>
				)}
			</div>
		</section>
	)
}

export default BlogPosts