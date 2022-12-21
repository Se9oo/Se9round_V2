import React from 'react';
import { PostDataType } from '~/types/post';
import TagList from '../common/tag/TagList';

const PostDetail = ({ postData }: { postData: PostDataType }) => {
	const { metaData, content } = postData;
	const { title, date, tags } = metaData;

	return (
		<div className="sm:mt-40 text-center sm:text-start">
			<h1 className="font-bold text-4xl mb-4 sm:mb-12">{title}</h1>
			{tags && tags.length > 0 ? <TagList tags={tags} customStyle="justify-center sm:justify-start mb-4" /> : null}
			<span>{date}</span>
		</div>
	);
};

export default PostDetail;
