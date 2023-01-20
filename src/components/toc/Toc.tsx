import React, { MouseEvent, useEffect, useState } from 'react';
import { HEADER_HEIGHT } from '~/constants/common';
import useTocObserve from '~/hooks/useTocObserve';

type TocHeadingType = {
	id: string;
	text: string;
	level: string | null;
};

const levelToPadding = (level: string | null) => {
	switch (level) {
		case '4':
			return 'pl-10';
		case '3':
			return 'pl-6';
		case '2':
		default:
			return 'pl-2';
	}
};

const Toc = () => {
	const [tocHeadings, setTocHeadings] = useState<TocHeadingType[]>([]);
	const [currentTargetId, setCurrentTargetId] = useState('');

	useTocObserve(setCurrentTargetId);

	useEffect(() => {
		const headingArray = Array.from(document.querySelectorAll('h2, h3, h4'));

		setTocHeadings(
			headingArray.map((heading) => ({
				id: heading.id,
				text: heading.innerHTML,
				level: heading.getAttribute('level'),
			})),
		);
	}, []);

	const handleTocItem = (e: MouseEvent, id: string) => {
		e.preventDefault();
		const selectedHeading = document.querySelector(`#${id}`);

		if (selectedHeading) {
			setCurrentTargetId(id);
			const yPos = window.pageYOffset + selectedHeading.getBoundingClientRect().top - HEADER_HEIGHT;

			window.scrollTo(0, yPos);
		}
	};

	return (
		<aside className="hidden md:block absolute left-full">
			<ul className="fixed top-[240px] ml-[5rem]">
				{tocHeadings.map((heading) => {
					const { id, text, level } = heading;
					return (
						<li
							key={`${id}`}
							className={`
              transition-all mb-1
              ${
								currentTargetId === id
									? 'border-l-2 border-l-main text-base font-bold dark:text-main'
									: 'border-none text-sm font-normal text-greyCopy dark:text-darkText'
							}
              ${levelToPadding(level)}`}
						>
							<a href={`#${id}`} onClick={(e) => handleTocItem(e, id)}>
								{text}
							</a>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Toc;
