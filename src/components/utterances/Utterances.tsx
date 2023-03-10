import React, { useEffect, useRef } from 'react';
import useControlTheme from '~/hooks/useControlTheme';

const LIGHT_THEME = 'github-light';
const DARK_THEME = 'photon-dark';

const Utterances = () => {
	const { theme, systemTheme } = useControlTheme();
	const themeMode =
		(theme === 'system' && systemTheme && systemTheme === 'light') || theme === 'light' ? LIGHT_THEME : DARK_THEME;
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const utterancesIframe = document.querySelector('iframe.utterances-frame') as HTMLIFrameElement;

		if (!utterancesIframe) {
			const script = document.createElement('script');

			script.src = 'https://utteranc.es/client.js';
			script.async = true;
			script.setAttribute('repo', 'Se9oo/Se9round_V2');
			script.setAttribute('issue-term', 'pathname');
			script.setAttribute('theme', themeMode);
			script.setAttribute('label', 'blog-comment');
			script.setAttribute('crossorigin', 'annonymous');

			ref.current?.appendChild(script);
		}

		utterancesIframe?.contentWindow?.postMessage(
			{
				type: 'set-theme',
				theme: themeMode,
			},
			'*',
		);
	}, [themeMode]);

	return <div ref={ref} />;
};

export default Utterances;
