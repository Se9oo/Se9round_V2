import React from 'react';
import router from 'next/router';
import Image from 'next/image';
import TagList from '../tags/TagList';
import { PAGE_URLS } from '~/constants/url';
import { convertSpaceToDash } from '~/utils/format';
import { PostMetaDataType } from '~/types/post';

const PostCard = ({ metaData }: { metaData: PostMetaDataType }) => {
	const { title, description, date, tags, socialImage } = metaData;

	const handleMovePostDetailPage = () => {
		router.push(`${PAGE_URLS.POST}/${convertSpaceToDash(title)}`);
	};

	return (
		<article
			className="w-full sm:h-[172px] flex sm:justify-between flex-col sm:flex-row cursor-pointer z-content"
			onClick={handleMovePostDetailPage}
			onKeyDown={undefined}
		>
			<div className="relative w-full h-[132px] sm:h-auto sm:w-[36%] mb-6 sm:mb-0 mr-2 sm:mr-12">
				<Image src={socialImage} alt="post-thumbnail" fill priority className="rounded-md object-cover" sizes="100vw" />
			</div>
			<div className="relative sm:w-[65%] h-full flex flex-col">
				<h3 className="font-bold text-[22px] mb-4 break-all sm:break-normal leading-[28px] tracking-[-0.5px]">
					{title}
				</h3>
				<p className="block mb-6 sm:mb-0 break-all sm:break-normal tracking-[-0.5px]">{description}</p>
				{tags && tags.length > 0 ? <TagList tags={tags} customStyle="sm:absolute sm:bottom-0 sm:left-0" /> : null}
				<span className="text-[15px] font-medium absolute bottom-0 right-0 dark:text-darkText">{date}</span>
			</div>
		</article>
	);
};

export default PostCard;
