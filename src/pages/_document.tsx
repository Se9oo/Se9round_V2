import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="annonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="dark:bg-dark">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
