import { Suspense } from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import DocsCategories from '@/components/docs/DocsCategories';
import { getConceptsPostMetadataList } from '@/utils/content';

export const metadata: Metadata = {
	title: 'se9round.dev | docs',
	description: '개념 정리 문서',
};

const DocsPage = async () => {
	const posts = await getConceptsPostMetadataList();

	return (
		<MainLayout>
			<h1 className="mb-10 text-4xl sm:mb-20">DOCS</h1>
			<Suspense fallback={null}>
				<DocsCategories posts={posts} />
			</Suspense>
		</MainLayout>
	);
};

export default DocsPage;
