import { Moon, Sun } from 'phosphor-react';
import React from 'react'

import { useTheme, THEME } from '~/utils/theme-provider';

export const ThemeButton = () => {
	const [theme, setTheme] = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEME.light ? THEME.dark : THEME.light
    );
  };

	return (
		<button 
			onClick={toggleTheme}
			title='Toggles light & dark'
			aria-label={theme??''}
			aria-live="polite"
		>
			{theme === 'light' ? <Moon /> : <Sun />}
		</button>
	)
}
