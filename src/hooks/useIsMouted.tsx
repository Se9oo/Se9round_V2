import React, { useEffect, useState } from 'react';

// eslint-disable-next-line consistent-return
const useIsMouted = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
};

export default useIsMouted;
