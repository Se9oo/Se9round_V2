import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { PAGE_URLS } from '~/constants/url';

const TagItem = ({ tag }: { tag: string }) => {
	const router = useRouter();

	const handleButton = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push({ pathname: PAGE_URLS.TAGS, query: { tagName: tag } });
	};

	return (
		<button
			type="button"
			className="block rounded-[4px] bg-main px-2 py-[1px] text-xs sm:text-sm font-bold text-white dark:text-darkText"
			onClick={handleButton}
		>
			{tag}
		</button>
	);
};

export default TagItem;
