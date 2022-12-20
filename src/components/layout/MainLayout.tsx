import React, { ReactNode } from 'react';
import Header from '../header/Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative w-screen max-w-[1024px] mx-auto my-0 bg-white blackbg-slate-900 mt-14 sm:mt-[72px] p-3 sm:p-6">
			<Header />
			{children}
		</main>
	);
};

export default MainLayout;
