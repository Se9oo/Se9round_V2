import React, { ReactNode } from 'react';
import Header from '../header/Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="relative w-screen max-w-[768px] mx-auto my-0 bg-white dark:bg-dark dark:text-darkText leading-6 traking-[-0.5px]">
			<Header />
			<section className="mt-14 sm:mt-[72px] p-6 sm:p-0">{children}</section>
		</main>
	);
};

export default MainLayout;
