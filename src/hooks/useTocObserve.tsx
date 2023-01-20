/* eslint-disable consistent-return */
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type TargetRefType = {
	[index: string]: IntersectionObserverEntry;
};

const useTocObserve = (setCurrentTargetId: Dispatch<SetStateAction<string>>) => {
	const contentRef = useRef<TargetRefType>({});

	useEffect(() => {
		const targetElements = Array.from(document.querySelectorAll('h2, h3, h4'));

		if (targetElements.length === 0) return;

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					contentRef.current[entry.target.id] = entry;
				});

				const visibleContent = Object.values(contentRef.current).filter((content) => content.isIntersecting);

				if (visibleContent[0]) {
					setCurrentTargetId(visibleContent[0].target.id);
				}
			},
			{
				threshold: 0.4,
				rootMargin: '-72px 0% -50% 0px',
			},
		);

		targetElements.map((target) => io.observe(target));

		return () => {
			io.disconnect();
		};
	}, [setCurrentTargetId]);
};

export default useTocObserve;
