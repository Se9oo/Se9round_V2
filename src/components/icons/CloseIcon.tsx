import React from 'react';

const CloseIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={`icon icon-tabler icon-tabler-x ${className}`}
			width={32}
			height={32}
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1={18} y1={6} x2={6} y2={18} />
			<line x1={6} y1={6} x2={18} y2={18} />
		</svg>
	);
};

export default CloseIcon;
