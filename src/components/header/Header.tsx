import React, { useState } from 'react';
import router from 'next/router';
import { useTheme } from 'next-themes';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';
import MobileMenuIcon from '../icons/MobileMenuIcon';
import useIsMounted from '~/hooks/useIsMounted';
import { PAGE_URLS } from '~/constants/url';
import { MenusData } from '~/types/common';
import SlideMenu from '../menu/SlideMenu';

const menus: MenusData[] = ['TAGS'];

const Header = () => {
	const mounted = useIsMounted();
	const { theme, setTheme } = useTheme();

	const [isOpen, setIsOpen] = useState(false);

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const handleMoveMenu = (menu: Partial<MenusData>) => {
		router.push(PAGE_URLS[menu]);
	};

	if (!mounted) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 w-full h-14 sm:h-[72px] shadow-sm z-header bg-white dark:bg-dark">
			<div className="w-full max-w-[768px] h-full mx-auto my-0 flex justify-between items-center px-6 sm:px-4 py-3 sm:py-6">
				<h1>
					<button type="button" onClick={() => handleMoveMenu('HOME')}>
						<strong className="text-[24px] tracking-[-0.5px] font-bold italic text-dark dark:text-main">
							se9round
						</strong>
					</button>
				</h1>
				<ul className="flex justify-start items-center">
					<li className="flex justify-center items-center">
						<button type="button" onClick={handleTheme}>
							{theme === 'light' ? (
								<LightModeIcon className="stroke-red" />
							) : (
								<DarkModeIcon className="stroke-yellow" />
							)}
						</button>
					</li>
					<li>
						<button type="button" className="block sm:hidden ml-2" onClick={() => setIsOpen(true)}>
							<MobileMenuIcon />
						</button>
					</li>
					{menus.map((menu) => {
						return (
							<li
								key={`${menu}`}
								className="hidden sm:block text-sm ml-4 hover:text-main dark:text-main dark:hover:text-darkText cursor-pointer font-bold transition-all"
								onClick={() => handleMoveMenu(menu)}
								onKeyDown={() => {}}
							>
								{menu}
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
