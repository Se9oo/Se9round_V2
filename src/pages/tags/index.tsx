/* eslint-disable array-callback-return */
import React from 'react';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import PageHead from '~/components/common/Head/PageHead';
import Tags from '~/components/tags/Tags';
import { PostFileType } from '~/types/post';
import { MARKDOWN_FILE_PATH } from '~/constants/url';

const TagsPage = (props: { tags: string[]; posts: PostFileType[] }) => {
	const { tags, posts } = props;

	return (
		<>
			<PageHead title="se9round.dev | tags" url="https://se9round.dev/tags" />
			<MainLayout>
				<h1 className="text-4xl mb-10 sm:mb-20">TAGS</h1>
				<Tags tags={tags} posts={posts} />
			</MainLayout>
		</>
	);
};

export default TagsPage;

export const getStaticProps = async () => {
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);

	const posts = files.map((file) => {
		const { data } = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8'));

		return {
			fileName: file.replace('.md', ''),
			data,
		};
	});

	const [...tags] = new Set<string>([
		...posts
			.map((post) => post.data.tags.reduce((acc: string, cur: string) => acc.concat(cur), []))
			.reduce((acc: string[], cur: string[]) => acc.concat(cur), []),
	]);

	return {
		props: {
			tags,
			posts,
		},
	};
};
