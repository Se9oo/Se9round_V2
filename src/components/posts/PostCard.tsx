import React from 'react';
import router from 'next/router';
import TagList from '../tags/TagList';
import { PAGE_URLS } from '~/constants/url';
import { convertSpaceToDash } from '~/utils/format';
import { PostMetaDataType } from '~/types/post';

const PostCard = ({ metaData }: { metaData: PostMetaDataType }) => {
	const { title, description, date, tags } = metaData;

	const handleMovePostDetailPage = () => {
		router.push(`${PAGE_URLS.POST}/${convertSpaceToDash(title)}`);
	};

	return (
		<article
			className="w-full sm:h-[172px] flex sm:justify-between flex-col sm:flex-row cursor-pointer z-content"
			onClick={handleMovePostDetailPage}
			onKeyDown={handleMovePostDetailPage}
		>
			<img
				src="./images/dongdong.jpeg"
				alt="dongdong"
				className="w-full h-[132px] sm:h-auto sm:w-[36%] rounded-md mb-4 sm:mb-0 mr-2 sm:mr-12 object-cover"
			/>
			<div className="relative sm:w-[65%] flex flex-col">
				<h3 className="font-bold text-[22px] mb-4 break-all sm:break-normal">{title}</h3>
				<p className="block text-md sm:text-lg mb-4 sm:mb-0 break-all sm:break-normal">{description}</p>
				{tags && tags.length > 0 ? (
					<TagList tags={tags} customStyle="mb-4 sm:mb-0 sm:absolute sm:bottom-0 sm:left-0" />
				) : null}
				<span className="text-[15px] font-medium sm:absolute bottom-0 right-0 dark:text-darkText">{date}</span>
			</div>
		</article>
	);
};

export default PostCard;
