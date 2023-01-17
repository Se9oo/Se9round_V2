import React, { ReactNode } from 'react';
import Header from '../header/Header';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative">
			<Header />
			<main className="relative w-full max-w-[768px] mx-auto my-0 bg-white dark:bg-dark dark:text-darkText leading-6 traking-[-0.5px]">
				<section className="mt-14 sm:mt-[72px] p-6 sm:p-4">{children}</section>
			</main>
		</div>
	);
};

export default MainLayout;
