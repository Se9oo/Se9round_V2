import React, { useEffect, useState } from 'react';

// eslint-disable-next-line consistent-return
const useIsMounted = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
};

export default useIsMounted;
