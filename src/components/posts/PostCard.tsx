import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TagList from '../tags/TagList';
import { PAGE_URLS } from '@/constants/url';
import { convertSpaceToDash, getFormattedDate } from '@/utils/format';
import { PostMetaDataType } from '@/types/post';

const PostCard = ({ metaData }: { metaData: PostMetaDataType }) => {
	const { title, description, date, tags, socialImage } = metaData;

	return (
		<article>
			<Link
				href={`${PAGE_URLS.POST}/${convertSpaceToDash(title)}`}
				className="z-content flex w-full cursor-pointer flex-col sm:h-[172px] sm:flex-row sm:justify-between"
			>
				{socialImage && (
					<div className="relative mr-2 mb-6 h-[132px] w-full sm:mr-12 sm:mb-0 sm:h-auto sm:w-[36%]">
						<Image
							src={socialImage}
							alt="post-thumbnail"
							fill
							className="rounded-md object-cover"
							sizes="
							(min-width: 768px) 245px,
							100vw"
							priority
						/>
					</div>
				)}
				<div className="relative flex h-full flex-col sm:w-[65%]">
					<h3 className="mb-4 text-[22px] leading-[28px] font-bold tracking-[-0.5px] break-all sm:break-normal">
						{title}
					</h3>
					<p className="mb-6 block tracking-[-0.5px] break-all sm:mb-0 sm:break-normal">{description}</p>
					{tags && tags.length > 0 ? <TagList tags={tags} customStyle="sm:absolute sm:bottom-0 sm:left-0" /> : null}
					<span className="absolute right-0 bottom-0 text-[15px] leading-3 font-medium dark:text-darkText">
						{getFormattedDate(date, 'hyphen')}
					</span>
				</div>
			</Link>
		</article>
	);
};

export default PostCard;
