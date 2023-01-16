import * as React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import PostList from '~/components/posts/PostList';
import { PostFileType } from '~/types/post';
import { MARKDOWN_FILE_PATH } from '~/constants/url';

const Selog = (props: { posts: PostFileType[] }) => {
	const { posts } = props;

	return (
		<MainLayout>
			<PostList posts={posts} />
		</MainLayout>
	);
};

export default Selog;

export const getStaticProps = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);

	const posts = files.map((file) => {
		const fileName = file.replace('.md', '');

		const parsedContent = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8'));

		const { data } = parsedContent;

		return {
			fileName,
			data,
		};
	});

	return {
		props: {
			posts,
		},
	};
};
