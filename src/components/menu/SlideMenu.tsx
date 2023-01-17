import React, { Dispatch, SetStateAction } from 'react';
import { useTheme } from 'next-themes';
import useScrollLock from '~/hooks/useScrollLock';
import SlideMenuList from './SlideMenuList';
import { Z_INDEX } from '~/constants/zindex';
import CloseIcon from '../icons/CloseIcon';

const SlideMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
	const { theme } = useTheme();
	useScrollLock(isOpen);

	return (
		<div className={`block sm:hidden ${Z_INDEX.slideMenu}`}>
			<div
				className={`fixed sm:hidden top-0 right-0  h-screen ${
					isOpen ? 'w-full opacity-[0.5]' : 'w-0 opacity-0'
				} bg-dark `}
			/>
			<aside
				className={`fixed top-0 right-0 h-full transition-all ${isOpen ? 'w-[40%]' : 'w-0'} ${
					theme === 'light' ? 'bg-white' : 'bg-main'
				}`}
			>
				{isOpen ? (
					<button type="button" className="absolute top-2 left-[-32px] cursor-pointer" onClick={() => setIsOpen(false)}>
						<CloseIcon className="text-white" />
					</button>
				) : null}
				<SlideMenuList />
			</aside>
		</div>
	);
};

export default SlideMenu;
