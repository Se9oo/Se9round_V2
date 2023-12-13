import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GA_TRACKING_ID = 'G-ZE5CPKYB9Q';

export const pageview = (url: URL) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

export const event = (action: Gtag.EventNames, { event_category, event_label, value }: Gtag.EventParams) => {
	window.gtag('event', action, {
		event_category,
		event_label,
		value,
	});
};

export const useGtag = () => {
	const router = useRouter();

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		const handleRouteChange = (url: URL) => {
			pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		router.events.on('hashChangeComplete', handleRouteChange);
		// eslint-disable-next-line consistent-return
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
			router.events.off('hashChangeComplete', handleRouteChange);
		};
	}, [router.events]);
};
