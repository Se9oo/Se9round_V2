import React from 'react';
import TagList from '../common/tag/TagList';
import { PostDataType } from '~/types/post';
import PostMarkdown from './PostMarkdown';
import useIsMounted from '~/hooks/useIsMounted';

const PostDetail = ({ postData }: { postData: PostDataType }) => {
	const isMouted = useIsMounted();

	const { metaData, content } = postData;
	const { title, date, tags } = metaData;

	return (
		<>
			{isMouted ? (
				<div className="sm:mt-40 sm:text-start">
					<h1 className="font-bold text-[40px] leading-10 mb-4 sm:mb-12">{title}</h1>
					{tags && tags.length > 0 ? <TagList tags={tags} customStyle="justify-center sm:justify-start mb-4" /> : null}
					<span>{date}</span>
					<div id="markdown-wrapper" className="text-lg ">
						<PostMarkdown content={content} />
					</div>
				</div>
			) : null}
		</>
	);
};

export default PostDetail;
