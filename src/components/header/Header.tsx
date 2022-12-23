import React from 'react';
import router from 'next/router';
import { useTheme } from 'next-themes';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';
import MobileMenuIcon from '../icons/MobileMenuIcon';
import useIsMounted from '~/hooks/useIsMounted';
import { PAGE_URLS } from '~/constants/url';

const menus = ['POSTS', 'TAGS'];

const Header = () => {
	const mounted = useIsMounted();
	const { theme, setTheme } = useTheme();

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const handleMoveHome = () => {
		router.push(PAGE_URLS.HOME);
	};

	if (!mounted) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 w-full h-14 sm:h-[72px] shadow-sm z-header bg-white dark:bg-dark">
			<div className="w-full max-w-[768px] h-full mx-auto my-0 flex justify-between items-center px-6 sm:px-2 py-3 sm:py-6">
				<h1>
					<button type="button" onClick={handleMoveHome}>
						selog
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
						<button type="button" className="block sm:hidden ml-2">
							<MobileMenuIcon />
						</button>
					</li>
					{menus.map((menu) => {
						return (
							<li
								key={`${menu}`}
								className="hidden sm:block text-sm ml-4 hover:text-main dark:text-main dark:hover:text-darkText cursor-pointer font-bold transition-all"
							>
								{menu}
							</li>
						);
					})}
				</ul>
			</div>
		</header>
	);
};

export default Header;
