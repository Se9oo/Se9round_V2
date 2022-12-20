/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			main: '#439A97',
			red: '#EB455F',
			yellow: '#FFE15D',
		},
		extend: {},
	},
	plugins: [],
};
