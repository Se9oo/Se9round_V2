import React from 'react';
import PageHead from '~/components/common/Head/PageHead';
import MainLayout from '~/components/layout/MainLayout';
import PostList from '~/components/posts/PostList';
import { PostFileType } from '~/types/post';
import { getPostDataFromMarkdownFiles } from '~/utils/file';

const Se9round = (props: { posts: PostFileType[] }) => {
	const { posts } = props;

	return (
		<>
			<PageHead />
			<MainLayout>
				<PostList posts={posts} />
			</MainLayout>
		</>
	);
};

export default Se9round;

export const getStaticProps = async () => {
	const posts = getPostDataFromMarkdownFiles().sort((a, b) => b.data.timestamp - a.data.timestamp);

	return {
		props: {
			posts,
		},
	};
};
