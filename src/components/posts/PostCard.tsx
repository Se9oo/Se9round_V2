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
		<article className="group">
			<Link
				href={`${PAGE_URLS.POST}/${convertSpaceToDash(title)}`}
				className="z-content flex w-full cursor-pointer flex-col sm:h-[172px] sm:flex-row sm:justify-between"
			>
				<div className="relative order-2 flex h-full flex-col sm:order-1 sm:w-[65%]">
					<h3
						className="mb-4 text-[22px] leading-[28px] font-bold tracking-[-0.5px] break-all group-hover:text-main
							sm:break-normal"
					>
						{title}
					</h3>
					<p
						className="mb-6 block tracking-[-0.5px] break-keep text-greyCopy sm:mb-0 sm:break-normal
							dark:text-darkText/80"
					>
						{description}
					</p>
					{tags && tags.length > 0 ? <TagList tags={tags} customStyle="sm:absolute sm:bottom-0 sm:left-0" /> : null}
					<span className="absolute right-0 bottom-0 text-[15px] leading-3 font-medium text-greyCopy dark:text-darkText">
						{getFormattedDate(date, 'hyphen')}
					</span>
				</div>
				{socialImage && (
					<div className="relative order-1 mb-6 aspect-video w-full sm:order-2 sm:mb-0 sm:ml-12 sm:h-auto sm:w-[36%]">
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
			</Link>
		</article>
	);
};

export default PostCard;
