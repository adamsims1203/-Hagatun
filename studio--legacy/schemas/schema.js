import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import page from './documents/page'
import blogPost from './documents/blog-post'
import section from './documents/section'

import generalSettings from './documents/settings-general'
import cookieSettings from './documents/settings-cookie'
import promoSettings from './documents/settings-promo'
import headerSettings from './documents/settings-header'
import footerSettings from './documents/settings-footer'
import seoSettings from './documents/settings-seo'
import menu from './documents/menu'

// Module types
import startPageHero from './modules/start-page-hero'
import dividerPhoto from './modules/divider-photo'
import cta from './modules/cta'
import hero from './modules/hero'
import partners from './modules/partners'
import blogPosts from './modules/blog-posts'
import marquee from './modules/marquee'

// Object types
import office from './objects/office'
import card from './objects/card';
import seo from './objects/seo'

import navPage from './objects/nav-page'
import navLink from './objects/nav-link'
import socialLink from './objects/social-link'

import accordions from './objects/accordions'
import accordion from './objects/accordion'

import author from './objects/author'
import blockContent from './objects/blockContent'
import category from './objects/category'


/*  ------------------------------------------ */
/*  Schema documents / modules / objects
/*  ------------------------------------------ */
export default createSchema({
  // The name of our schema
  name: 'content',

  types: schemaTypes.concat([
    /* ----------------- */
    /* 1: Document types */
		page,
		blogPost,
    section,

    generalSettings,
    cookieSettings,
    promoSettings,
    headerSettings,
    footerSettings,
    seoSettings,
    menu,

    /* --------------- */
    /* 2: Module types */
    startPageHero,
    dividerPhoto,
		cta,
		hero,
		partners,
		blogPosts,
    marquee,

    /* ----------------------- */
    /* 3: Generic Object types */
		office,
		card,
    seo,

    navPage,
    navLink,
    socialLink,

    accordions,
    accordion,

		author,
		blockContent,
		category,
  ])
})
