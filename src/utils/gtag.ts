export const GA_TRACKING_ID = 'G-ZE5CPKYB9Q';

export const pageview = (url: string) => {
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
