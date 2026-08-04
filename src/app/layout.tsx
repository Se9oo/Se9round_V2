import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import NextScript from 'next/script';
import '@/styles/global.css';
import Providers from './providers';
import GtagListener from '@/components/common/Analytics/GtagListener';
import { GA_TRACKING_ID } from '@/utils/gtag';

export const metadata: Metadata = {
	title: 'se9round.dev',
	description: 'se9oo 개발 블로그',
	other: {
		'google-site-verification': 'Tnf1TW2CuqiBCgfP-BC9qkilgf8ab3QztcxLjBrfFSI',
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="ko" suppressHydrationWarning>
			<head>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width,
					maximum-scale=1, minimum-scale=1, user-scalable=no"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#00aba9" />
				<meta name="theme-color" content="#ffffff" />
				<script
					src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
					integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
					crossOrigin="anonymous"
					async
				/>
				{process.env.NODE_ENV !== 'development' && (
					<script
						id="gtag-init"
						dangerouslySetInnerHTML={{
							__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});
					`,
						}}
					/>
				)}
			</head>
			<body className="dark:bg-dark">
				{process.env.NODE_ENV !== 'development' && (
					<NextScript
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					/>
				)}
				<Suspense fallback={null}>
					<GtagListener />
				</Suspense>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
