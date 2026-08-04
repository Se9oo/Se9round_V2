'use client';

import React, { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '~/constants/url';

const TagItem = ({ tag }: { tag: string }) => {
	const router = useRouter();

	const handleButton = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push(`${PAGE_URLS.TAGS}?tagName=${encodeURIComponent(tag)}`);
	};

	return (
		<button
			type="button"
			className="block rounded-[4px] bg-main px-2 py-px text-xs sm:text-sm font-bold text-white dark:text-darkText"
			onClick={handleButton}
		>
			{tag}
		</button>
	);
};

export default TagItem;
