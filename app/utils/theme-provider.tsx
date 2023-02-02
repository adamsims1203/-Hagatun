import { useFetcher } from "@remix-run/react";
import { cloneElement, Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const THEME = {
  dark: "dark",
  light: "light",
} as const

export type Theme = typeof THEME[keyof typeof THEME]

const themes: Array<Theme> = Object.values(THEME);

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? THEME.dark : THEME.light;

interface ThemeProviderProps extends React.PropsWithChildren {
	specifiedTheme?: Theme | null;
}

function ThemeProvider({
  children,
  specifiedTheme,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    // On the server, if we don't have a specified theme then we should
    // return null and the clientThemeCode will set the theme for us
    // before hydration. Then (during hydration), this code will get the same
    // value that clientThemeCode got so hydration is happy.
    if (specifiedTheme)
      return themes.includes(specifiedTheme) ? specifiedTheme : null

    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof document === "undefined") return null

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();
  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) return

    persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? THEME.dark : THEME.light);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children && typeof children === 'object' && 'props' in children 
				? cloneElement(children, { 'color-scheme': theme }) 
				: children
			}
    </ThemeContext.Provider>
  );
}

const clientThemeCode = `
	;(() => {
		const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
			? 'dark'
			: 'light';
		const el = document.documentElement;
		const themeAlreadyApplied = el.hasAttribute('color-scheme')
		if (themeAlreadyApplied) {
			// this script shouldn't exist if the theme is already applied!
			console.warn(
				"Hi there, could you let me know you're seeing this message? Thanks!",
			);
		} else {
			el.setAttribute('color-scheme', theme);
		}
		const meta = document.querySelector('meta[name=color-scheme]');
		if (meta) {
			if (theme === 'dark') {
				meta.content = 'dark light';
			} else if (theme === 'light') {
				meta.content = 'light dark';
			}
		} else {
			console.warn(
				"Hey, could you let me know you're seeing this message? Thanks!",
			);
		}
	})();
`;

const themeStylesCode = `
  /* default light, but app-preference is "dark" */
  html[color-scheme='dark'] {
    light-mode {
      display: none;
    }
  }

  /* default light, and no app-preference */
  html:not([color-scheme='dark']) {
    dark-mode {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    /* prefers dark, but app-preference is "light" */
    html[color-scheme='light'] {
      dark-mode {
        display: none;
      }
    }

    /* prefers dark, and app-preference is "dark" */
    html[color-scheme='dark'],
    /* prefers dark and no app-preference */
    html:not([color-scheme='light']) {
      light-mode {
        display: none;
      }
    }
  }
`;

function ThemeHead({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme();

  return (
    <>
      {/*
        On the server, "theme" might be `null`, so clientThemeCode ensures that
        this is correct before hydration.
      */}
      <meta
        name="color-scheme"
        content={theme === "light" ? "light dark" : "dark light"}
      />
      {/*
        If we know what the theme is from the server then we don't need
        to do fancy tricks prior to hydration to make things match.
      */}
      {ssrTheme ? null : (
        <>
          <script
            // NOTE: we cannot use type="module" because that automatically makes
            // the script "defer". That doesn't work for us because we need
            // this script to run synchronously before the rest of the document
            // is finished loading.
            dangerouslySetInnerHTML={{ __html: clientThemeCode }}
          />
          <style dangerouslySetInnerHTML={{ __html: themeStylesCode }} />
        </>
      )}
    </>
  );
}

const clientDarkAndLightModeElsCode = `;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const darkEls = document.querySelectorAll("dark-mode");
  const lightEls = document.querySelectorAll("light-mode");
  for (const darkEl of darkEls) {
    if (theme === "dark") {
      for (const child of darkEl.childNodes) {
        darkEl.parentElement?.append(child);
      }
    }
    darkEl.remove();
  }
  for (const lightEl of lightEls) {
    if (theme === "light") {
      for (const child of lightEl.childNodes) {
        lightEl.parentElement?.append(child);
      }
    }
    lightEl.remove();
  }
})();`;

function ThemeBody({ ssrTheme }: { ssrTheme: boolean }) {
  return ssrTheme ? null : (
    <script
      dangerouslySetInnerHTML={{ __html: clientDarkAndLightModeElsCode }}
    />
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * This allows you to render something that depends on the theme without
 * worrying about whether it'll SSR properly when we don't actually know
 * the user's preferred theme.
 */
function Themed({
  dark,
  light,
  initialOnly = false,
}: {
  dark: ReactNode | string;
  light: ReactNode | string;
  initialOnly?: boolean;
}) {
  const [theme] = useTheme();
  const [initialTheme] = useState(theme);
  const themeToReference = initialOnly ? initialTheme : theme;
  const serverRenderWithUnknownTheme =
    !theme && typeof document === "undefined";

  if (serverRenderWithUnknownTheme) {
    // stick them both in and our little script will update the DOM to match
    // what we'll render in the client during hydration.
    return (
      <>
        {createElement("dark-mode", null, dark)}
        {createElement("light-mode", null, light)}
      </>
    );
  }

  return <>{themeToReference === "light" ? light : dark}</>;
}

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export {
  isTheme,
  THEME,
  Themed,
  ThemeBody,
  ThemeHead,
  ThemeProvider,
  useTheme,
};
