import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostList from '@/components/posts/PostList';
import { getTechPostMetadataList } from '@/utils/content';

export const metadata: Metadata = {
	title: 'se9round.dev',
	description: 'se9oo 개발 블로그',
};

const Se9round = async () => {
	const posts = (await getTechPostMetadataList()).sort((a, b) => b.data.timestamp - a.data.timestamp);

	return (
		<MainLayout>
			<Suspense>
				<PostList posts={posts} />
			</Suspense>
		</MainLayout>
	);
};

export default Se9round;
