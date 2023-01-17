import React, { useEffect } from 'react';

const useScrollLock = (isOpen?: boolean) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.removeProperty('overflow');
		};
	}, [isOpen]);
};

export default useScrollLock;
