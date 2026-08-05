import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostDetail from '@/components/posts/PostDetail';
import { PostMetaDataType } from '@/types/post';
import { getTechPostMetadataList, getFileNameBySlug } from '@/utils/content';
import { convertSpaceToDash } from '@/utils/format';

export const dynamicParams = false;

export const generateStaticParams = async () => {
	const posts = await getTechPostMetadataList();
	return posts.map((post) => ({
		title: convertSpaceToDash(post.data.title),
	}));
};

export const generateMetadata = async ({ params }: { params: Promise<{ title: string }> }): Promise<Metadata> => {
	const { title } = await params;
	const slug = decodeURIComponent(title);
	const fileName = await getFileNameBySlug(slug);
	if (!fileName) return {};

	const mod = await import(`@/content/posts/tech/${fileName}.mdx`);
	const metaData: PostMetaDataType = mod.metadata;

	return {
		title: metaData.title,
		description: metaData.description,
		keywords: metaData.tags,
		openGraph: {
			url: `${process.env.NEXT_PUBLIC_HOME_URL}/post/${title}`,
			images: [`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH}/${metaData.socialImage}`],
		},
	};
};

const Post = async ({ params }: { params: Promise<{ title: string }> }) => {
	const { title } = await params;
	const slug = decodeURIComponent(title);
	const fileName = await getFileNameBySlug(slug);
	if (!fileName) notFound();

	const mod = await import(`@/content/posts/tech/${fileName}.mdx`);
	const Content = mod.default;
	const metaData: PostMetaDataType = mod.metadata;

	return (
		<MainLayout>
			<PostDetail metaData={metaData}>
				<Content />
			</PostDetail>
		</MainLayout>
	);
};

export default Post;
