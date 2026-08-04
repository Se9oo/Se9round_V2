'use client';

import React from 'react';
import MoveToTopIcon from '../icons/MoveToTopIcon';

const MoveToTop = () => {
	const handleMoveToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<button
			type="button"
			onClick={handleMoveToTop}
			className="flex h-9 w-9 items-center justify-center rounded-md bg-darkText text-dark transition-all
				hover:bg-greyLight"
		>
			<MoveToTopIcon />
		</button>
	);
};

export default MoveToTop;
