import React from 'react';
import Head from 'next/head';

const PageHead = ({
	title = 'se9round.dev',
	description = 'se9oo 개발 블로그',
	keywords,
	thumbnail = '',
	url = 'https://se9round.dev',
}: {
	title: string;
	description: string;
	keywords: string[];
	thumbnail: string;
	url: string;
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			{keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(',')} />}
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={thumbnail} />
			<meta property="og:description" content={description} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={thumbnail} />
		</Head>
	);
};

export default PageHead;
