import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '~/components/layout/MainLayout';
import PostDetail from '~/components/posts/PostDetail';
import PageHead from '~/components/common/Head/PageHead';
import { PostDataType } from '~/types/post';
import { convertSpaceToDash } from '~/utils/format';
import { getPostDataAtFile, getPostDataFromMarkdownFiles } from '~/utils/file';

const Post = (props: PostDataType) => {
	const router = useRouter();
	const {
		metaData: { title, description, tags, socialImage },
	} = props;

	return (
		<>
			<PageHead
				title={title}
				description={description}
				keywords={tags}
				thumbnail={socialImage}
				url={router.query?.title ? `${process.env.NEXT_PUBLIC_HOME_URL}/post/${router.query.title}` : ''}
			/>
			<MainLayout>
				<PostDetail postData={props} />
			</MainLayout>
		</>
	);
};

export default Post;

export const getStaticPaths = async () => {
	const paths = getPostDataFromMarkdownFiles().map((post) => {
		return {
			params: {
				title: convertSpaceToDash(post.data.title),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }: { params: { title: string } }) => {
	const { title } = params;
	const { data: metaData, content } = getPostDataAtFile(`${title}.md`);

	return {
		props: {
			metaData,
			content,
		},
	};
};
