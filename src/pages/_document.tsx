import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width,
					maximum-scale=1, minimum-scale=1, user-scalable=no"
				/>
				<title>se9round.dev</title>
				<meta name="description" content="se9oo 개발 블로그" />
			</Head>
			<body className="dark:bg-dark">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
