import * as React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import PostList from '~/components/posts/PostList';
import { PostFileType } from '~/types/post';

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
	const files = fs.readdirSync('public/posts');

	const posts = files.map((file) => {
		const fileName = file.replace('.md', '');

		const content = fs.readFileSync(`public/posts/${file}`, 'utf-8');
		const parsedContent = matter(content);

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
