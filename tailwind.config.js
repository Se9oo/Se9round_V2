/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			main: '#439A97',
			dark: '#1B1D25',
			darkText: '#D8DBE7',
			red: '#EB455F',
			yellow: '#FFE15D',
			white: '#FFFFFF',
		},
		extend: {
			zIndex: {
				content: 1,
				tag: 2,
				header: 10,
			},
		},
	},
	plugins: [],
};
