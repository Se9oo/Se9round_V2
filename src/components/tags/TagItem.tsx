import React from 'react';
import Link from 'next/link';
import { PAGE_URLS } from '~/constants/url';

const TagItem = ({ tag }: { tag: string }) => {
	return (
		<Link
			className="block rounded-[4px] bg-main px-2 py-[0.5px]"
			href={{ pathname: PAGE_URLS.TAGS, query: { tagName: tag } }}
			as={PAGE_URLS.TAGS}
		>
			<span className="text-xs sm:text-sm font-bold text-white dark:text-darkText">{tag}</span>
		</Link>
	);
};

export default TagItem;
