import { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import PageTransition from '../common/transition/PageTransition';

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative flex h-full flex-col dark:text-darkText">
			<Header />
			<PageTransition
				className="traking-[-0.5px] relative mx-auto my-0 w-full max-w-[768px] flex-1 bg-white leading-6 dark:bg-dark"
			>
				<section className="mt-14 p-6 sm:mt-[72px] sm:p-4">{children}</section>
			</PageTransition>
			<Footer />
		</div>
	);
};

export default MainLayout;
