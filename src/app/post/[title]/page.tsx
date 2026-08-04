import React from 'react';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PostDetail from '@/components/posts/PostDetail';
import { PostDataType } from '@/types/post';
import { convertSpaceToDash } from '@/utils/format';
import { getPostDataAtFile, getPostDataFromMarkdownFiles } from '@/utils/file';

export const dynamicParams = false;

export const generateStaticParams = () => {
	return getPostDataFromMarkdownFiles().map((post) => ({
		title: convertSpaceToDash(post.data.title),
	}));
};

export const generateMetadata = async ({ params }: { params: Promise<{ title: string }> }): Promise<Metadata> => {
	const { title: rawTitle } = await params;
	const title = decodeURIComponent(rawTitle);
	const { data: metaData } = getPostDataAtFile(`${title}.md`);

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
	const { title: rawTitle } = await params;
	const title = decodeURIComponent(rawTitle);
	const { data: metaData, content } = getPostDataAtFile(`${title}.md`);
	const postData: PostDataType = { metaData, content };

	return (
		<MainLayout>
			<PostDetail postData={postData} />
		</MainLayout>
	);
};

export default Post;
