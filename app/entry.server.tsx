
import { type EntryContext, redirect } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { getLocaleFromPath, validateLocale, i18n } from "./loaders/i18n";
import { IS_PROD } from "./utils/constants";

// todo: [use ETags](https://sergiodxa.com/articles/use-etags-in-remix) when adding cache/caching

// Regex to check whether something has an extension, e.g. .jpg
const PUBLIC_FILE = /\.(.*)$/

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
	const url = new URL(request.url);

  const headers: Record<string, string> = {};

	const originalUrl =  url.toString()
	
	// normalize
	url.pathname = url.pathname.toLowerCase()

		// make it UTF-8
		.replace(/* å */'c3a5', 'a')
		.replace(/* ä */'c3a4', 'a')
		.replace(/* ö */'c3b6', 'o')

		// Remove special characters
		.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")

		// dash instead of space
		.replace(/\s\s+/g, ' ')
		.replace(/\s+/g, "-")

		// remove trailing slash
		.replace(/\/$/g, "")


  try {
		// Early return if it is a public file such as an image
		if (PUBLIC_FILE.test(url.pathname)) throw ''

		// check locales
		const locale = {
			pathname: url.pathname,
			url: getLocaleFromPath(url.pathname, i18n.stripBase /*
				If strip base, then we can't assume that the locale might be in the url
				the following options would be cumbersome and lead to the system preferences always wining
			*/),
			// TODO: maybe build in cookies for locale?
			// cookie: validateLocale(cookies.NEXT_LOCALE),
			clientCountry: validateLocale((request as any)?.geo?.country?.toLowerCase?.()),
			clientLanguage: validateLocale(request.headers.get("accept-language")?.split(",")?.[0].split("-")?.[0].toLowerCase()),
		}
		
		// determent locale
		const language = 
			locale.url || 
			locale.clientLanguage ||
			locale.clientCountry ||
			i18n.base
	
		// Helpful console.log for debugging
		/* console.log({
			...locale, language
		}); */
	
		// redirect malicious requests
		// todo: build more extended (db-based) redirect list & solution &| [6G Firewall](https://perishablepress.com/6g/)
		if (
			url.pathname.startsWith("/.env") ||
			url.pathname.startsWith("/php") ||
			url.pathname.startsWith("/java_script") ||
			url.pathname.startsWith("/_nuxt") ||
			url.pathname.startsWith("/uploads") ||
			url.pathname.startsWith("/sdk") ||
			url.pathname.startsWith("/evox") ||
			url.pathname.startsWith("/nmap") ||
			url.pathname.startsWith("/boaform") ||
			url.pathname.startsWith("/wp-admin")
		) {
			return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ", 307);
		}
		
		// redirect to https:
		if (
			// note: not sure why this worked in Deno? [refed](https://community.fly.io/t/redirect-http-to-https/2714/3?u=canrau) [good article](https://fly.io/blog/always-be-connecting-with-https/)
			// url.protocol === "http:" ||
			request.headers.get("X-Forwarded-Proto") === "http"
		) url.protocol = "https:";
	
		// prepend www.
		//if (IS_PROD && !url.host.startsWith("www")) url.host = `www.${url.host}`
	
		/*
			Strip base language
			defaultLang = 'sv' && stripDefaultLang
			result:
				"/sv/bokforing" -> "/bokforing" 
				"/sv" -> "" 
				"/en/accounting" -> "/en/accounting" 
				"/en" -> "/en" 
		*/
		url.pathname = url.pathname.replace(new RegExp(`^\/${locale.url}$|^\/${locale.url}\/`), '/')

		if(!i18n.stripBase || language !== i18n.base) {
			url.pathname = `${language}${url.pathname}`
		}
		
		url.pathname = url.pathname.replace(/\/$/g, "")
		const cleanedUrl = url.toString()

		if (originalUrl !== cleanedUrl) {
			return redirect(cleanedUrl, { headers, status: 301 });
		}
	} catch (error) {}

  const { matches, routeData } = remixContext;

  const match = matches.find((m: any) => m?.pathname === url.pathname);

  const canonical = match?.route?.id && routeData?.[match.route.id]?.canonical;

  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);
	
  responseHeaders.set("Content-Type", "text/html");
  if (canonical) {
    responseHeaders.set("Link", `<${canonical}>; rel="canonical"`);
  }

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}