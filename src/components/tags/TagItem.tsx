'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PAGE_URLS } from '@/constants/url';

const TagItem = ({ tag }: { tag: string }) => {
	const router = useRouter();

	const handleButton = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push(`${PAGE_URLS.TAGS}?tagName=${encodeURIComponent(tag)}`);
	};

	return (
		<button
			type="button"
			className="block rounded-full bg-main/10 px-3 py-1 text-xs font-semibold text-main sm:text-sm dark:bg-main/20
				dark:text-main"
			onClick={handleButton}
		>
			{tag}
		</button>
	);
};

export default TagItem;
