'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PostMetaDataType } from '@/types/post';
import KakaoIcon from '../icons/KakaoIcon';

const KakaoShare = ({ post }: { post: PostMetaDataType }) => {
	const params = useParams<{ title: string }>();
	const { title, socialImage, tags } = post;

	useEffect(() => {
		const createKakaoButton = () => {
			if (window.Kakao) {
				const kakao = window.Kakao;

				if (!kakao.isInitialized()) {
					kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
				}

				const url = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${params.title}`;
				const tagStr = tags.map((tag) => `#${tag}`).join(' ');

				kakao.Share.createDefaultButton({
					container: '#kakao-link-btn',
					objectType: 'feed',
					content: {
						title,
						description: tagStr,
						imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PATH}/${socialImage}`,
						link: {
							mobileWebUrl: url,
							webUrl: url,
						},
					},
					buttons: [
						{
							title: '게시글 확인하기',
							link: {
								mobileWebUrl: url,
								webUrl: url,
							},
						},
					],
				});
			}
		};

		createKakaoButton();
	}, [title, socialImage, params.title, tags]);

	return (
		<button
			id="kakao-link-btn"
			type="button"
			className="flex h-9 w-9 items-center justify-center rounded-md bg-yellowKakao transition-all
				hover:bg-yellowKakaoHover"
		>
			<KakaoIcon />
		</button>
	);
};

export default KakaoShare;
