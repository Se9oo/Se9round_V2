/* eslint-disable array-callback-return */
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import Tags from '~/components/tags/Tags';
import { PostFileType } from '~/types/post';
import { MARKDOWN_FILE_PATH } from '~/constants/url';

const TagsPage = (props: { tags: string[]; posts: PostFileType[] }) => {
	const { tags, posts } = props;

	return (
		<MainLayout>
			<h1 className="text-4xl mb-10 sm:mb-20">TAGS</h1>
			<Tags tags={tags} posts={posts} />
		</MainLayout>
	);
};

export default TagsPage;

export const getStaticProps = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);

	const posts = files.map((file) => {
		const fileName = file.replace('.md', '');

		const content = fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8');
		const parsedContent = matter(content);

		const { data } = parsedContent;

		return {
			fileName,
			data,
		};
	});

	const tagSet = new Set();

	posts.map((post) => {
		post.data.tags.map((tag: string) => {
			tagSet.add(tag);
		});
	});

	return {
		props: {
			tags: [...tagSet],
			posts,
		},
	};
};
