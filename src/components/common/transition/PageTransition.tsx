'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

const animate = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

const PageTransition = ({ children, className }: { children: ReactNode; className?: string }) => {
	const pathname = usePathname();

	return (
		<motion.main
			key={pathname}
			initial={animate.initial}
			animate={animate.animate}
			exit={animate.exit}
			transition={{ duration: 0.3, type: 'tween' }}
			className={className}
		>
			{children}
		</motion.main>
	);
};

export default PageTransition;
