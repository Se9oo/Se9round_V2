/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			main: '#8491D9',
			dark: '#1B1D25',
			darkText: '#D8DBE7',
			red: '#EB455F',
			yellow: '#FFE15D',
			yellowKakao: '#FFDE00',
			yellowKakaoHover: '#D8C543',
			white: '#FFFFFF',
			grey: 'rgba(41, 69, 105, 0.1)',
			greyLight: '#EAEAEA',
			greyCopy: '#6B728E',
		},
		screens: {
			sm: '768px',
			md: '1370px',
		},
		extend: {
			zIndex: {
				content: 1,
				tag: 2,
				floating: 9,
				header: 10,
			},
		},
	},
	plugins: [],
};
