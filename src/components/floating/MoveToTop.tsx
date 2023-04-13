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
			className="flex items-center justify-center transition-all rounded-md w-9 h-9 bg-darkText hover:bg-greyLight text-dark"
		>
			<MoveToTopIcon />
		</button>
	);
};

export default MoveToTop;
