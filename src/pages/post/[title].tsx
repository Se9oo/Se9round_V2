import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import PostDetail from '~/components/posts/PostDetail';
import { PostDataType, PostMetaDataType } from '~/types/post';
import { convertSpaceToDash } from '~/utils/format';
import { MARKDOWN_FILE_PATH } from '~/constants/url';

const Post = (props: PostDataType) => {
	return (
		<MainLayout>
			<PostDetail postData={props} />
		</MainLayout>
	);
};

export default Post;

export const getStaticPaths = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);
	const paths = files.map((file) => {
		const content = fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8');
		const parsedContent = matter(content);

		const { data } = parsedContent;
		const { title } = data as PostMetaDataType;

		return {
			params: {
				title: convertSpaceToDash(title),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }: { params: { title: string } }) => {
	const { title } = params;

	const fileName = fs.readFileSync(`${MARKDOWN_FILE_PATH}/${title}.md`, 'utf-8');
	const { data: metaData, content } = matter(fileName);

	return {
		props: {
			metaData,
			content,
		},
	};
};
