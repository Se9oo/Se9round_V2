/* eslint-disable array-callback-return */
import React from 'react';
import MainLayout from '~/components/layout/MainLayout';
import PageHead from '~/components/common/Head/PageHead';
import Tags from '~/components/tags/Tags';
import { PostFileType } from '~/types/post';
import { getPostDataFromMarkdownFiles } from '~/utils/file';

const TagsPage = (props: { tags: string[]; posts: PostFileType[] }) => {
	const { tags, posts } = props;

	return (
		<>
			<PageHead title="se9round.dev | tags" url="https://se9round.dev/tags" />
			<MainLayout>
				<h1 className="mb-10 text-4xl sm:mb-20">TAGS</h1>
				<Tags tags={tags} posts={posts} />
			</MainLayout>
		</>
	);
};

export default TagsPage;

export const getStaticProps = async () => {
	const posts = getPostDataFromMarkdownFiles();

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
