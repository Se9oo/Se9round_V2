'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '~/utils/gtag';

const GtagListener = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		const query = searchParams.toString();
		pageview(query ? `${pathname}?${query}` : pathname);
	}, [pathname, searchParams]);

	return null;
};

export default GtagListener;
