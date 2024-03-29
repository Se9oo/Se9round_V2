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
		const selectedHeading = document.getElementById(`${id}`);

		if (selectedHeading) {
			setCurrentTargetId(id);
			const yPos = window.pageYOffset + selectedHeading.getBoundingClientRect().top - HEADER_HEIGHT;

			window.scrollTo(0, yPos);
		}
	};

	return (
		<aside className="absolute hidden md:block left-full">
			<ul className="fixed top-[240px] ml-[5rem] border-l-2 border-main pl-[1rem]">
				{tocHeadings.map((heading) => {
					const { id, text, level } = heading;
					return (
						<li
							key={`${id}`}
							className={`
              transition-all mb-1
							text-sm
							font-medium
              ${currentTargetId === id ? 'dark:text-main' : 'text-greyCopy dark:text-darkText'}
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
