import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostList from '@/components/posts/PostList';
import { getPostDataFromMarkdownFiles } from '@/utils/file';

export const metadata: Metadata = {
	title: 'se9round.dev',
	description: 'se9oo 개발 블로그',
};

const Se9round = () => {
	const posts = getPostDataFromMarkdownFiles().sort((a, b) => b.data.timestamp - a.data.timestamp);

	return (
		<MainLayout>
			<Suspense>
				<PostList posts={posts} />
			</Suspense>
		</MainLayout>
	);
};

export default Se9round;
