'use client';

import { useState } from 'react';
import Link from 'next/link';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';
import MobileMenuIcon from '../icons/MobileMenuIcon';
import useIsMounted from '@/hooks/useIsMounted';
import { PAGE_URLS } from '@/constants/url';
import { MenusData } from '@/types/common';
import SlideMenu from '../menu/SlideMenu';
import useControlTheme from '@/hooks/useControlTheme';

const menus: MenusData[] = ['TAGS'];

const Header = () => {
	const mounted = useIsMounted();
	const { theme, systemTheme, handleTheme } = useControlTheme();

	const [isOpen, setIsOpen] = useState(false);

	if (!mounted) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 z-header h-14 w-full bg-white shadow-xs sm:h-[72px] dark:bg-dark">
			<div
				className="mx-auto my-0 flex h-full w-full max-w-[768px] items-center justify-between px-6 py-3 sm:px-4 sm:py-6"
			>
				<h1>
					<Link href={PAGE_URLS.HOME}>
						<strong className="mr-2 text-[24px] font-bold tracking-[-0.5px] italic underline">se9round.dev</strong>
					</Link>
				</h1>
				<ul className="flex items-center justify-start">
					<li className="flex items-center justify-center">
						<button type="button" onClick={handleTheme} aria-label="color mode change button">
							{(theme === 'system' && systemTheme && systemTheme === 'light') || theme === 'light' ? (
								<LightModeIcon className="stroke-red" />
							) : (
								<DarkModeIcon className="stroke-yellow" />
							)}
						</button>
					</li>
					<li>
						<button type="button" className="ml-2 block sm:hidden" onClick={() => setIsOpen(true)}>
							<MobileMenuIcon />
						</button>
					</li>
					{menus.map((menu) => {
						return (
							<li
								key={`${menu}`}
								className="ml-4 hidden cursor-pointer text-sm font-bold transition-all hover:text-main sm:block"
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
