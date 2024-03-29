import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TagList from '../tags/TagList';
import { PAGE_URLS } from '~/constants/url';
import { convertSpaceToDash, getFormattedDate } from '~/utils/format';
import { PostMetaDataType } from '~/types/post';

const PostCard = ({ metaData }: { metaData: PostMetaDataType }) => {
	const { title, description, date, tags, socialImage } = metaData;

	return (
		<article>
			<Link
				href={`${PAGE_URLS.POST}/${convertSpaceToDash(title)}`}
				className="w-full sm:h-[172px] flex sm:justify-between flex-col sm:flex-row cursor-pointer z-content"
			>
				<div className="relative w-full h-[132px] sm:h-auto sm:w-[36%] mb-6 sm:mb-0 mr-2 sm:mr-12">
					<Image
						src={socialImage}
						alt="post-thumbnail"
						fill
						className="object-cover rounded-md"
						sizes="
						(min-width: 768px) 245px,
						100vw"
						priority
					/>
				</div>
				<div className="relative sm:w-[65%] h-full flex flex-col">
					<h3 className="font-bold text-[22px] mb-4 break-all sm:break-normal leading-[28px] tracking-[-0.5px]">
						{title}
					</h3>
					<p className="block mb-6 sm:mb-0 break-all sm:break-normal tracking-[-0.5px]">{description}</p>
					{tags && tags.length > 0 ? <TagList tags={tags} customStyle="sm:absolute sm:bottom-0 sm:left-0" /> : null}
					<span className="text-[15px] leading-3 font-medium absolute bottom-0 right-0 dark:text-darkText">
						{getFormattedDate(date, 'hyphen')}
					</span>
				</div>
			</Link>
		</article>
	);
};

export default PostCard;
