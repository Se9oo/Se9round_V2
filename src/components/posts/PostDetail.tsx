import React from 'react';
import TagList from '../tags/TagList';
import PostMarkdown from './PostMarkdown';
import { PostDataType } from '~/types/post';
import useIsMounted from '~/hooks/useIsMounted';
import Utterances from '../utterances/Utterances';
import Toc from '../toc/Toc';
import FloatingActions from '../floating/FloatingActions';
import { getFormattedDate } from '~/utils/format';

const PostDetail = ({ postData }: { postData: PostDataType }) => {
	const isMouted = useIsMounted();

	const {
		metaData: { title, date, tags },
		content,
	} = postData;

	return (
		<>
			{isMouted ? (
				<>
					<div className="relative">
						<Toc />
						<FloatingActions post={postData} />
					</div>
					<div className="sm:mt-20 sm:text-start">
						<h1 className="font-bold text-[36px] sm:text-[40px] leading-[44px] sm:leading-[48px] tracking-[-0.5px] mb-10 sm:mb-12">
							{title}
						</h1>
						{tags && tags.length > 0 ? <TagList tags={tags} customStyle="justify-start mb-4" /> : null}
						<span className="block mb-10 text-sm sm:mb-14">{getFormattedDate(date, 'kor')}</span>
						<div id="markdown-wrapper" className="text-lg">
							<PostMarkdown content={content} />
						</div>
						<div className="mt-[60px] sm:mt-[120px]">
							<Utterances />
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default PostDetail;
