import React, { useState } from 'react';
import Link from 'next/link';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';
import MobileMenuIcon from '../icons/MobileMenuIcon';
import useIsMounted from '~/hooks/useIsMounted';
import { PAGE_URLS } from '~/constants/url';
import { MenusData } from '~/types/common';
import SlideMenu from '../menu/SlideMenu';
import useControlTheme from '~/hooks/useControlTheme';

const menus: MenusData[] = ['TAGS'];

const Header = () => {
	const mounted = useIsMounted();
	const { theme, systemTheme, handleTheme } = useControlTheme();

	const [isOpen, setIsOpen] = useState(false);

	if (!mounted) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 w-full h-14 sm:h-[72px] shadow-sm z-header bg-white dark:bg-dark">
			<div className="w-full max-w-[768px] h-full mx-auto my-0 flex justify-between items-center px-6 sm:px-4 py-3 sm:py-6">
				<h1>
					<Link href={PAGE_URLS.HOME}>
						<strong className="text-[24px] tracking-[-0.5px] font-bold italic underline mr-2">se9round.dev</strong>
					</Link>
				</h1>
				<ul className="flex items-center justify-start">
					<li className="flex items-center justify-center">
						<button type="button" onClick={handleTheme}>
							{(theme === 'system' && systemTheme && systemTheme === 'light') || theme === 'light' ? (
								<LightModeIcon className="stroke-red" />
							) : (
								<DarkModeIcon className="stroke-yellow" />
							)}
						</button>
					</li>
					<li>
						<button type="button" className="block ml-2 sm:hidden" onClick={() => setIsOpen(true)}>
							<MobileMenuIcon />
						</button>
					</li>
					{menus.map((menu) => {
						return (
							<li
								key={`${menu}`}
								className="hidden ml-4 text-sm font-bold transition-all cursor-pointer sm:block hover:text-main"
							>
								<Link href={PAGE_URLS[menu]}>{menu}</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<SlideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</header>
	);
};

export default Header;
