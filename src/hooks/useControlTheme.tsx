import React from 'react';
import { useTheme } from 'next-themes';

const useControlTheme = () => {
	const { theme, setTheme, systemTheme } = useTheme();

	const handleTheme = () => {
		if (theme && theme !== 'system') {
			setTheme(theme === 'light' ? 'dark' : 'light');
			return;
		}

		if (systemTheme) {
			setTheme(systemTheme === 'light' ? 'dark' : 'light');
		}
	};

	return { theme, systemTheme, handleTheme };
};

export default useControlTheme;
