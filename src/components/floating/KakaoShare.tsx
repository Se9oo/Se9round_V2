import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PostDataType } from '~/types/post';
import KakaoIcon from '../icons/KakaoIcon';

const KakaoShare = ({ post }: { post: PostDataType }) => {
	const router = useRouter();
	const {
		metaData: { title, socialImage, tags },
	} = post;

	useEffect(() => {
		const createKakaoButton = () => {
			if (window.Kakao) {
				const kakao = window.Kakao;
				const url = `${process.env.NEXT_PUBLIC_HOME_URL}/post/${router.query.title}`;
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
	}, [title, socialImage, router.query.title, tags]);

	return (
		<button
			id="kakao-link-btn"
			type="button"
			className="flex items-center justify-center transition-all rounded-md w-9 h-9 bg-yellowKakao hover:bg-yellowKakaoHover"
		>
			<KakaoIcon />
		</button>
	);
};

export default KakaoShare;
