declare module '*.svg' {
	import React = require('react');

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

// Declare Prism oneDark theme missing from @types/react-syntax-highlighter
declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
	export { default as oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';
}

interface Window {
	Kakao: any;
}

declare module 'gtag.js';
