import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

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
	const router = useRouter();

	return (
		<motion.main
			key={router.route}
			initial={animate.initial}
			animate={animate.animate}
			exit={animate.exit}
			transition={{
				type: 'spring',
				stiffness: 360,
				damping: 20,
				duration: 1,
			}}
			className={className}
		>
			{children}
		</motion.main>
	);
};

export default PageTransition;
