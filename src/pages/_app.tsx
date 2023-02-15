import React, { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '~/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		if (!window.Kakao.isInitialized()) {
			window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
		}
	}, []);

	return (
		<ThemeProvider attribute="class">
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width,
					maximum-scale=1, minimum-scale=1, user-scalable=no"
				/>
				<title>se9round.dev</title>
				<meta name="description" content="se9oo 개발 블로그" />
				<script
					src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
					integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
					crossOrigin="anonymous"
				/>
			</Head>
			<ToastContainer />
			<AnimatePresence initial={false} mode="wait">
				<Component {...pageProps} />
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
