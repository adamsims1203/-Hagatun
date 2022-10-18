import { RemixBrowser } from '@remix-run/react'
import React from 'react';
import { hydrate } from 'react-dom'

hydrate( 
	<React.StrictMode>
		<RemixBrowser />
	</React.StrictMode>,
	document
)

// if the browser supports SW (all modern browsers do it)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // we will register it after the page complete the load
    navigator.serviceWorker.register("/sw.js");
  });
}