import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}


// if the browser supports SW (all modern browsers do it)
/* if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // we will register it after the page complete the load
    navigator.serviceWorker.register("/sw.js");
  });
}
*/
