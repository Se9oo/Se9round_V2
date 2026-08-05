import React, { ReactNode } from 'react';
import TagList from '../tags/TagList';
import { PostMetaDataType } from '@/types/post';
import Utterances from '../utterances/Utterances';
import Toc from '../toc/Toc';
import FloatingActions from '../floating/FloatingActions';
import { getFormattedDate } from '@/utils/format';

const PostDetail = ({ metaData, children }: { metaData: PostMetaDataType; children: ReactNode }) => {
	const { title, date, tags } = metaData;

	return (
		<>
			<div className="relative">
				<Toc />
				<FloatingActions post={metaData} />
			</div>
			<div className="sm:mt-20 sm:text-start">
				<h1
					className="mb-10 text-[36px] leading-[44px] font-bold tracking-[-0.5px] sm:mb-12 sm:text-[40px]
						sm:leading-[48px]"
				>
					{title}
				</h1>
				{tags && tags.length > 0 ? <TagList tags={tags} customStyle="justify-start mb-4" /> : null}
				<span className="mb-10 block text-sm sm:mb-14">{getFormattedDate(date, 'kor')}</span>
				<div id="markdown-wrapper" className="text-lg">
					{children}
				</div>
				<div className="mt-[60px] sm:mt-[120px]">
					<Utterances />
				</div>
			</div>
		</>
	);
};

export default PostDetail;
