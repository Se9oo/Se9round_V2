import React from 'react';
import Link from 'next/link';
import { PAGE_URLS } from '@/constants/url';

const menus: Array<keyof typeof PAGE_URLS> = ['HOME', 'TAGS', 'DOCS'];

const SlideMenuList = () => {
	return (
		<ul className="p-4">
			{menus.map((menu) => {
				return (
					<li key={menu}>
						<Link className="block w-full py-2 text-left font-bold dark:text-white" href={PAGE_URLS[menu]}>
							{menu}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default SlideMenuList;
