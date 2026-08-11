import { Suspense } from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import DocsCategories from '@/components/docs/DocsCategories';
import { getDocsPostMetadataList } from '@/utils/content';

export const metadata: Metadata = {
	title: 'se9round.dev | docs',
	description: '개념 정리',
};

const DocsPage = async () => {
	const posts = await getDocsPostMetadataList();

	return (
		<MainLayout>
			<Suspense fallback={null}>
				<DocsCategories posts={posts} />
			</Suspense>
		</MainLayout>
	);
};

export default DocsPage;
