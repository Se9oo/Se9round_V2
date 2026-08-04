// Declare Prism oneDark theme missing from @types/react-syntax-highlighter
declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
	export { default as oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';
}

interface Window {
	Kakao: any;
}

declare module 'gtag.js';
