import React from 'react';
import MoveToTop from './MoveToTop';
import KakaoShare from './KakaoShare';
import { PostDataType } from '~/types/post';
import CopyLink from './CopyLink';

const FloatingActions = ({ post }: { post: PostDataType }) => {
	return (
		<div className="md:absolute md:left-full">
			<ul className="fixed bottom-[40px] right-5 sm:right-[5%] md:right-auto md:ml-[5rem] flex flex-col items-center z-floating">
				<li className="mb-2">
					<MoveToTop />
				</li>
				<li className="mb-2">
					<CopyLink />
				</li>
				<li className="mb-2">
					<KakaoShare post={post} />
				</li>
			</ul>
		</div>
	);
};

export default FloatingActions;
