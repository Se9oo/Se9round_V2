import React, { ReactElement } from 'react';
import MoveToTop from './MoveToTop';
import CopyLink from './CopyLink';
import KakaoShare from './KakaoShare';
import { PostDataType } from '~/types/post';

type FloatingAction = {
	id: string;
	element: ReactElement;
};

const FloatingActions = ({ post }: { post: PostDataType }) => {
	const actions: FloatingAction[] = [
		{
			id: 'moveToTop',
			element: <MoveToTop />,
		},
		{
			id: 'copyLink',
			element: <CopyLink />,
		},
		{
			id: 'kakaoShare',
			element: <KakaoShare post={post} />,
		},
	];

	return (
		<div className="md:absolute md:left-full">
			<ul className="fixed bottom-[40px] right-5 sm:right-[5%] md:right-auto md:ml-[5rem] flex flex-col items-center z-floating">
				{actions.map((action) => {
					const { id, element } = action;

					return (
						<li key={id} className="mb-2">
							{element}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default FloatingActions;
