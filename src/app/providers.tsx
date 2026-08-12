'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence } from 'motion/react';
import { ToastContainer } from 'react-toastify';

const Providers = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
		}
	}, []);

	return (
		<ThemeProvider attribute="class">
			<ToastContainer />
			<AnimatePresence>{children}</AnimatePresence>
		</ThemeProvider>
	);
};

export default Providers;
