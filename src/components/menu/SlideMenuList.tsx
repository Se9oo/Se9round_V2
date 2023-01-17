import React from 'react';
import { useRouter } from 'next/router';
import { PAGE_URLS } from '~/constants/url';

const menus: Array<keyof typeof PAGE_URLS> = ['HOME', 'TAGS'];

const SlideMenuList = () => {
	const router = useRouter();

	return (
		<ul className="p-4">
			{menus.map((menu) => {
				return (
					<li key={menu}>
						<button
							type="button"
							className="w-full text-left py-2 font-bold"
							onClick={() => {
								router.push(PAGE_URLS[menu]);
							}}
						>
							{menu}
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default SlideMenuList;
