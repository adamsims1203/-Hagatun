import React from 'react'
import { useShouldHydrate } from 'remix-utils';

import { useTheme, THEME } from '~/utils/theme-provider';

export const ThemeButton = () => {
  const shouldHydrate = useShouldHydrate();
	const [theme, setTheme] = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.light ? THEME.dark : THEME.light
    );
  };

	return (
		<button 
			onClick={toggleTheme}
			title={`Toggles light & dark${!shouldHydrate?'; Requires Javascript':''}`}
			aria-label={theme??''}
			aria-live="polite"
			disabled={!shouldHydrate}

		>
			{shouldHydrate ? theme : 'Auto'}
		</button>
	)
}
