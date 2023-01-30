import React, { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import PageTransition from '../common/transition/PageTransition';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative h-full flex flex-col">
			<Header />
			<PageTransition className="relative w-full max-w-[768px] mx-auto my-0 bg-white dark:bg-dark dark:text-darkText leading-6 traking-[-0.5px] flex-1">
				<section className="mt-14 sm:mt-[72px] p-6 sm:p-4">{children}</section>
			</PageTransition>
			<Footer />
		</div>
	);
};

export default MainLayout;
