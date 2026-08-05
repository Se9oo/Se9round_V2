import React from 'react';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostDetail from '@/components/posts/PostDetail';
import { PostMetaDataType } from '@/types/post';

const TECH_DIR = path.join(process.cwd(), 'src/content/posts/tech');

export const dynamicParams = false;

export const generateStaticParams = () => {
	return fs
		.readdirSync(TECH_DIR)
		.filter((f) => f.endsWith('.mdx'))
		.map((f) => ({ title: f.replace('.mdx', '') }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ title: string }> }): Promise<Metadata> => {
	const { title } = await params;
	const mod = await import(`@/content/posts/tech/${title}.mdx`);
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
	const mod = await import(`@/content/posts/tech/${title}.mdx`);
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
