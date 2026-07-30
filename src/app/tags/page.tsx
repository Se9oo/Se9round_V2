import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import MainLayout from '~/components/layout/MainLayout';
import Tags from '~/components/tags/Tags';
import { getPostDataFromMarkdownFiles } from '~/utils/file';

export const metadata: Metadata = {
	title: 'se9round.dev | tags',
	openGraph: {
		url: 'https://se9round.dev/tags',
	},
};

const TagsPage = () => {
	const posts = getPostDataFromMarkdownFiles();

	const tags = [...new Set(posts.flatMap((post) => post.data.tags))];

	return (
		<MainLayout>
			<h1 className="mb-10 text-4xl sm:mb-20">TAGS</h1>
			<Suspense fallback={null}>
				<Tags tags={tags} posts={posts} />
			</Suspense>
		</MainLayout>
	);
};

export default TagsPage;
