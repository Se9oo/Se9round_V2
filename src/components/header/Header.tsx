import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import DarkModeIcon from '../icons/DarkModeIcon';
import LightModeIcon from '../icons/LightModeIcon';

const menus = ['posts', 'tags'];

const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className="fixed top-0 left-0 w-screen h-14 sm:h-[72px] shadow-sm">
			<div className="w-full max-w-[1240px] flex justify-between items-center bg:white black:bg-slate-900 mx-auto my-0 px-3 py-3 sm:py-6">
				<h1>selog</h1>
				<ul className="flex justify-start items-center leading-[24px] tracking-[-0.5px]">
					<li>
						<button type="button" className="text-center w-8 h-8 mx-auto my-0" onClick={handleTheme}>
							{theme === 'light' ? (
								<LightModeIcon className="stroke-red" />
							) : (
								<DarkModeIcon className="stroke-yellow" />
							)}
						</button>
					</li>
					{menus.map((menu) => {
						return (
							<li key={`${menu}`} className="mx-8 hover:text-main cursor-pointer font-medium transition-all">
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
