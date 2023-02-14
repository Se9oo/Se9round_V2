import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import matter from 'gray-matter';
import MainLayout from '~/components/layout/MainLayout';
import PostDetail from '~/components/posts/PostDetail';
import { PostDataType, PostMetaDataType } from '~/types/post';
import { convertSpaceToDash } from '~/utils/format';
import { MARKDOWN_FILE_PATH } from '~/constants/url';
import PageHead from '~/components/common/Head/PageHead';

const Post = (props: PostDataType) => {
	const router = useRouter();
	const {
		metaData: { title, description, tags, socialImage },
	} = props;

	useEffect(() => {
		const kakao = document.querySelector('#kakao');

		if (!kakao) {
			const head = document.querySelector('head');
			const script = document.createElement('script');
			script.id = 'kakao';
			script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
			script.defer = true;

			head?.appendChild(script);

			script.onload = () => {
				if (!window.Kakao.isInitialized()) {
					window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
				}
			};
		}
	}, []);

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
	const files = fs.readdirSync(MARKDOWN_FILE_PATH);
	const paths = files.map((file) => {
		const { data } = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${file}`, 'utf-8'));
		const { title } = data as PostMetaDataType;

		return {
			params: {
				title: convertSpaceToDash(title),
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
	const { data: metaData, content } = matter(fs.readFileSync(`${MARKDOWN_FILE_PATH}/${title}.md`, 'utf-8'));

	return {
		props: {
			metaData,
			content,
		},
	};
};
