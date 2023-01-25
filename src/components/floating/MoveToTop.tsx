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
			className="w-9 h-9 flex justify-center items-center bg-darkText hover:bg-greyLight rounded-md text-dark transition-all"
		>
			<MoveToTopIcon />
		</button>
	);
};

export default MoveToTop;
